#!/usr/bin/env python3
"""Hook PreToolUse do Claude Code: o Jev avalia o risco da ferramenta.

Fluxo:
  1. Regras em código: leitura óbvia → passa sem custo; linha vermelha → no mínimo "ask".
  2. Jev (1 chamada, 3 questions): destrutividade (score), dano real (noul), decisão (choice).
  3. Combina com os thresholds de jev/harness_policies.json.

"allow" do Jev NÃO pula as permissões do Claude Code (trust_allow=false): o hook
apenas não interfere. Sem chave → só as regras em código valem. Falha da API →
"ask" (on_api_error), nunca uma decisão inventada.

Desligar temporariamente: JEV_GUARD=off
"""

from __future__ import annotations

import json
import os
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from jev.jev_client import JevError, available  # noqa: E402
from jev.policies import load, precheck_tool, tool_guard  # noqa: E402

SEVERIDADE = {"allow": 0, "ask": 1, "deny": 2}


def emit(decision: str, reason: str) -> None:
    print(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": decision,
            "permissionDecisionReason": f"[Jev guard] {reason}",
        }
    }, ensure_ascii=False))


def log_decision(entry: dict) -> None:
    # Só metadados: ferramenta, decisão e motivos (sem o conteúdo da entrada).
    try:
        base = os.environ.get("JEV_LOG_FILE")
        logs = Path(base).parent if base else Path(__file__).resolve().parent.parent / "logs"
        path = logs / "guard_decisions.jsonl"
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as fh:
            fh.write(json.dumps({"ts": time.strftime("%Y-%m-%dT%H:%M:%S%z"), **entry}, ensure_ascii=False) + "\n")
    except OSError:
        pass


def main() -> int:
    if os.environ.get("JEV_GUARD", "").lower() in ("off", "0", "false"):
        return 0
    try:
        event = json.load(sys.stdin)
    except json.JSONDecodeError:
        return 0
    tool_name = event.get("tool_name", "")
    tool_input = event.get("tool_input") or {}
    cfg = load("harness_policies.json")["tool_guard"]

    piso, motivo_piso = precheck_tool(tool_name, tool_input)
    if piso == "skip":
        return 0

    motivos = [motivo_piso] if motivo_piso else []
    decisao = piso or "allow"
    if not available():
        if piso:
            emit(piso, f"{motivo_piso} (Jev sem chave: só regras locais)")
            log_decision({"tool": tool_name, "decisao": piso, "motivos": motivos, "jev": False})
        return 0

    try:
        out = tool_guard(tool_name, tool_input, event.get("cwd", ""))
        jev_dec = out["decisao"]
        motivos += out["motivos"]
    except JevError as err:
        jev_dec = cfg["on_api_error"]
        motivos.append(f"Jev indisponível ({str(err)[:120]}); decisão não simulada")

    if jev_dec in SEVERIDADE and SEVERIDADE[jev_dec] > SEVERIDADE[decisao]:
        decisao = jev_dec
    log_decision({"tool": tool_name, "decisao": decisao, "motivos": motivos, "jev": True})

    if decisao == "allow" and not cfg["trust_allow"]:
        return 0  # não interfere: valem as permissões normais do Claude Code
    if decisao in SEVERIDADE:
        emit(decisao, "; ".join(motivos))
    return 0


if __name__ == "__main__":
    sys.exit(main())
