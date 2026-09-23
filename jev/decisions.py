"""Construtores de questions e leitura tipada das respostas do Jev."""

from __future__ import annotations

from typing import Any

# Abaixo disto a decisão não é executada: escala para humano / Claude conservador.
MIN_CONFIDENCE = 0.4


def choice(instructions: Any, criteria: dict[str, Any]) -> dict:
    return {"type": "choice", "instructions": instructions, "criteria": criteria}


def score(instructions: Any, levels: list[Any]) -> dict:
    return {"type": "score", "instructions": instructions, "criteria": levels}


def noul(instructions: Any, true: Any = None, false: Any = None) -> dict:
    q: dict[str, Any] = {"type": "noul", "instructions": instructions}
    if true is not None or false is not None:
        q["criteria"] = {"true": true, "false": false}
    return q


def level_index(answer: dict) -> int:
    """Nível inteiro mais próximo do score esperado (o score pode ser fracionário)."""
    probs = answer.get("probabilities") or {}
    n = len(probs) or len(answer.get("legend") or {}) or 1
    return max(0, min(n - 1, int(round(float(answer["score"])))))


def summarize(qid: str, question: dict, answer: dict) -> dict:
    """Linha normalizada: valor, p do valor, confiança (None para noul)."""
    kind = answer.get("type") or question.get("type")
    if kind == "choice":
        label = answer["choice"]
        return {
            "id": qid,
            "tipo": "choice",
            "resposta": label,
            "p": float((answer.get("probabilities") or {}).get(label, 0.0)),
            "confidence": float(answer.get("confidence", 0.0)),
        }
    if kind == "score":
        idx = level_index(answer)
        levels = question.get("criteria") or []
        desc = levels[idx] if idx < len(levels) else None
        # Convenção dos níveis: "rótulo: descrição concreta".
        rotulo = desc.split(":", 1)[0].strip() if isinstance(desc, str) else None
        return {
            "id": qid,
            "tipo": "score",
            "resposta": f"{float(answer['score']):.2f} → {idx} ({rotulo})" if rotulo else f"{float(answer['score']):.2f}",
            "nivel": idx,
            "valor": float(answer["score"]),
            "p": float((answer.get("probabilities") or {}).get(str(idx), 0.0)),
            "confidence": float(answer.get("confidence", 0.0)),
        }
    p = float(answer["noul"])
    return {"id": qid, "tipo": "noul", "resposta": "sim" if p >= 0.5 else "não", "p": p, "confidence": None}


def generic_action(row: dict) -> str:
    """Ação sugerida genérica (as políticas de domínio refinam isto)."""
    if row["tipo"] == "noul":
        if 0.35 <= row["p"] <= 0.65:
            return "incerto → escalar para humano"
        return "seguir (sim)" if row["p"] > 0.65 else "seguir (não)"
    if row["confidence"] < MIN_CONFIDENCE:
        return "confiança baixa → escalar para humano / Claude conservador"
    return "seguir"


def table(result: dict, questions: dict, actions: dict[str, str] | None = None) -> str:
    """Tabela Markdown: pergunta | tipo | resposta | p | confidence | ação sugerida."""
    lines = [
        "| pergunta | tipo | resposta | p | confidence | ação sugerida |",
        "|---|---|---|---|---|---|",
    ]
    for qid, q in questions.items():
        row = summarize(qid, q, result["answers"][qid])
        conf = "—" if row["confidence"] is None else f"{row['confidence']:.2f}"
        action = (actions or {}).get(qid) or generic_action(row)
        lines.append(f"| {qid} | {row['tipo']} | {row['resposta']} | {row['p']:.2f} | {conf} | {action} |")
    usage = result.get("usage") or {}
    lines.append(
        f"\n_{result.get('backend')} · {result.get('model')} · "
        f"{usage.get('input_tokens', '?')} tokens de entrada · {result.get('latency_ms')} ms_"
    )
    return "\n".join(lines)
