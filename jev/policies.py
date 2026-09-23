"""Aplica as políticas: o Jev fornece julgamentos, este código aplica regras explícitas.

Regra geral: se o Jev falhar ou a confiança for < 0,4, ESCALAR — nunca executar
nem inventar a decisão.
"""

from __future__ import annotations

import json
import os
import re
from functools import lru_cache
from pathlib import Path
from typing import Any

from .decisions import summarize
from .jev_client import system_one
from .redact import compact, redact

JEV_DIR = Path(__file__).resolve().parent


@lru_cache(maxsize=None)
def load(name: str) -> dict:
    return json.loads((JEV_DIR / name).read_text(encoding="utf-8"))


def _rows(result: dict, questions: dict) -> dict[str, dict]:
    return {qid: summarize(qid, q, result["answers"][qid]) for qid, q in questions.items()}


def _pack(decisao: str, motivos: list[str], requer_humano: bool, rows: dict, result: dict, **extra) -> dict:
    return {
        "decisao": decisao,
        "requer_humano": requer_humano,
        "motivos": motivos,
        "jev": rows,
        "meta": {k: result.get(k) for k in ("backend", "model", "usage", "latency_ms", "request_id")},
        **extra,
    }


# ============================================================ tool guard ====

def _tool_text(tool_name: str, tool_input: dict) -> str:
    """Texto usado nas regras determinísticas: comando e caminhos (não o conteúdo escrito)."""
    parts = [str(tool_input.get(k, "")) for k in ("command", "file_path", "notebook_path", "path")]
    if tool_name == "apply_patch":
        parts.append(str(tool_input.get("patch") or tool_input.get("input") or "")[:400])
    return " ".join(p for p in parts if p)


def precheck_tool(tool_name: str, tool_input: dict) -> tuple[str | None, str]:
    """Regras determinísticas (sem custo de API).

    Retorna ("skip", motivo) para leitura óbvia, ("ask", motivo) para linha vermelha,
    ou (None, "") para consultar o Jev.
    """
    cfg = load("harness_policies.json")["tool_guard"]
    text = _tool_text(tool_name, tool_input)
    for rule in cfg["linhas_vermelhas"]:
        if re.search(rule["padrao"], text):
            return "ask", f"linha vermelha: {rule['motivo']}"
    if tool_name == "Bash":
        cmd = str(tool_input.get("command", ""))
        if "\n" not in cmd and any(re.search(p, cmd) for p in cfg["bash_somente_leitura"]):
            return "skip", "comando somente leitura"
    return None, ""


def tool_guard(tool_name: str, tool_input: dict, cwd: str = "") -> dict:
    """Decide allow / ask / deny para uma ferramenta. Levanta JevError se a API falhar."""
    cfg = load("harness_policies.json")
    guard = cfg["tool_guard"]
    t = guard["thresholds"]
    questions = guard["questions"]
    entrada = dict(tool_input)
    # Para Write/Edit o conteúdo importa menos que o caminho: resumimos e redigimos.
    state = {
        "projeto": cfg["contexto_projeto"],
        "acao": {
            "ferramenta": tool_name,
            "diretorio": cwd,
            "entrada": compact(redact(entrada), guard["max_chars_entrada"]),
        },
    }
    result = system_one(
        state, questions, timeout=guard["timeout_s"], max_retries=guard["max_retries"], tag="tool_guard"
    )
    rows = _rows(result, questions)
    destr, dano, dec = rows["destrutividade"], rows["dano_real"], rows["decisao"]
    motivos: list[str] = []

    if destr["valor"] >= t["risco_alto_score"] and destr["confidence"] >= t["deny_min_confidence"]:
        decisao = "deny"
        motivos.append(f"risco alto (score {destr['valor']:.2f}, conf {destr['confidence']:.2f})")
    elif min(destr["confidence"], dec["confidence"]) < t["low_confidence"]:
        decisao = "ask"
        motivos.append("confiança baixa do Jev → escalar")
    elif dano["p"] > t["dano_real_noul"]:
        decisao = "ask"
        motivos.append(f"possível efeito real (produção/dinheiro/dados/processo) p={dano['p']:.2f}")
    elif dec["resposta"] == "deny":
        # deny do choice sem risco alto confirmado pelo score: pede confirmação.
        decisao = "deny" if dec["confidence"] >= t["deny_min_confidence"] else "ask"
        motivos.append(f"Jev sugeriu deny (conf {dec['confidence']:.2f})")
    else:
        decisao = dec["resposta"]
        motivos.append(f"Jev: {decisao} (conf {dec['confidence']:.2f}), destrutividade {destr['resposta']}")
    return _pack(decisao, motivos, decisao != "allow", rows, result)


# ========================================================== model router ====

def route(pedido: str, tier_atual: str | None = None) -> dict:
    """Escolhe o tier de modelo para um pedido. Levanta JevError se a API falhar."""
    cfg = load("harness_policies.json")["model_router"]
    t = cfg["thresholds"]
    ordem = cfg["ordem"]
    questions = cfg["questions"]
    base = tier_atual or os.environ.get("JEV_ROUTER_BASE") or cfg["tier_base"]
    state = {"pedido": compact(pedido, cfg["max_chars_pedido"])}
    result = system_one(state, questions, timeout=cfg["timeout_s"], max_retries=1, tag="router")
    rows = _rows(result, questions)
    comp, esf, risco = rows["complexidade"], rows["esforco"], rows["risco_juridico"]
    motivos: list[str] = []

    alvo = comp["resposta"]
    tier = base
    if ordem.index(alvo) > ordem.index(base) and comp["confidence"] >= t["upgrade_min_confidence"]:
        tier = alvo
        motivos.append(f"upgrade para {alvo} (conf {comp['confidence']:.2f} >= {t['upgrade_min_confidence']})")
    elif ordem.index(alvo) < ordem.index(base) and comp["confidence"] >= t["downgrade_min_confidence"]:
        tier = alvo
        motivos.append(f"downgrade para {alvo} (conf {comp['confidence']:.2f} >= {t['downgrade_min_confidence']})")
    else:
        motivos.append(f"mantém {base} (Jev: {alvo}, conf {comp['confidence']:.2f})")

    if (
        esf["valor"] >= t["esforco_alto_score"]
        and esf["confidence"] >= t["upgrade_min_confidence"]
        and tier == "mechanical"
    ):
        tier = "ordinary"
        motivos.append("esforço alto: mínimo ordinary")
    if risco["p"] > t["risco_juridico_noul"]:
        tier = "hard"
        motivos.append(f"risco jurídico/irreversível p={risco['p']:.2f} → força hard")

    return _pack(
        tier, motivos, tier == "hard", rows, result, modelo=cfg["modelos"][tier], tier_base=base
    )


# ====================================================== políticas do escritório ====

def _run_policy(name: str, state: dict) -> tuple[dict, dict, dict, dict]:
    cfg = load("legal_policies.json")
    pol = cfg[name]
    questions = pol["questions"]
    state = redact(state, pol["max_chars"])
    result = system_one(state, questions, tag=name)
    return cfg, pol, _rows(result, questions), result


def triagem(state: dict) -> dict:
    """A) Triagem de entrada. Nunca envia resposta: só sugere o próximo passo."""
    cfg, pol, rows, result = _run_policy("triagem", state)
    t, minc = pol["thresholds"], cfg["min_confidence"]
    area, urg, novo, sens, prox = (rows[k] for k in ("area", "urgencia", "caso_novo", "dados_sensiveis", "proximo"))
    motivos: list[str] = []
    decisao = prox["resposta"]

    if prox["confidence"] < minc:
        decisao = "agendar_humano"
        motivos.append("confiança baixa no próximo passo → humano")
    if area["confidence"] < minc:
        motivos.append("área indefinida → advogado classifica")
        if decisao == "recusar_fora_escopo":
            decisao = "agendar_humano"
    if urg["valor"] >= t["urgencia_alta_score"] and decisao in ("responder_informativo", "pedir_documentos"):
        decisao = "agendar_humano"
        motivos.append("urgência alta → contato humano prioritário")
    if decisao == "recusar_fora_escopo":
        motivos.append("recusa exige confirmação do advogado (risco de prazo prescricional/decadencial do consulente)")
    lgpd = sens["p"] > t["dados_sensiveis_noul"]
    if lgpd:
        motivos.append("dados sensíveis: não ecoar dados, armazenar só em sistema interno (LGPD arts. 6º, 11 e 14)")
    return _pack(
        decisao,
        motivos,
        decisao != "responder_informativo" or lgpd,
        rows,
        result,
        area=area["resposta"] if area["confidence"] >= minc else "indefinida",
        urgencia=urg["resposta"],
        caso_novo=novo["p"] > t["caso_novo_noul"],
        lgpd_sensivel=lgpd,
        aviso="Sugestão de triagem. Nenhuma mensagem é enviada automaticamente; resposta informativa só com modelo pré-aprovado.",
    )


def radar(state: dict) -> dict:
    """B) Conteúdo/minuta antes da revisão humana. Nada é publicado ou protocolado."""
    cfg, pol, rows, result = _run_policy("radar", state)
    t, minc = pol["thresholds"], cfg["min_confidence"]
    capt, qual, dest = rows["captacao"], rows["qualidade_minuta"], rows["destino"]
    motivos: list[str] = []
    decisao = dest["resposta"]

    if capt["p"] > t["captacao_noul"]:
        decisao = "nao_usar"
        motivos.append(f"possível captação/solicitação direta (p={capt['p']:.2f}) → bloquear (Provimento OAB 205/2021)")
    elif dest["confidence"] < minc:
        decisao = "revisao_advogado"
        motivos.append("confiança baixa → revisão do advogado")
    elif decisao == "arquivo" and qual["valor"] >= t["pronta_score"]:
        motivos.append("minuta madura arquivada: confirme se não deveria ir à revisão")
    if decisao != "nao_usar":
        motivos.append("uso externo somente após revisão e assinatura do advogado")
    return _pack(decisao, motivos, True, rows, result, qualidade=qual["resposta"])


def acao_agente(state: dict) -> dict:
    """C) Próxima ação de um agente. Comunicação externa sempre exige humano."""
    cfg, pol, rows, result = _run_policy("acao_agente", state)
    t, minc = pol["thresholds"], cfg["min_confidence"]
    acao, rev, imp = rows["acao"], rows["precisa_revisao"], rows["impacto_cliente"]
    motivos: list[str] = []
    decisao = acao["resposta"]
    humano = False

    if acao["confidence"] < minc:
        decisao, humano = "esperar", True
        motivos.append("confiança baixa → aguardar decisão humana")
    if decisao == "enviar_mensagem":
        humano = True
        motivos.append("envio externo nunca é automático: preparar rascunho para o advogado")
    if rev["p"] > t["revisao_noul"]:
        humano = True
        motivos.append(f"Jev indica revisão humana (p={rev['p']:.2f})")
    if imp["valor"] >= t["impacto_alto_score"]:
        humano = True
        motivos.append("impacto alto para o cliente")
    return _pack(decisao, motivos, humano, rows, result, impacto=imp["resposta"])


POLICIES = {"triagem": triagem, "radar": radar, "acao": acao_agente}
