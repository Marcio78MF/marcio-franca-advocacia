#!/usr/bin/env python3
"""Hook UserPromptSubmit: o Jev sugere o tier de modelo para o pedido.

Limitação do harness: um hook NÃO troca o modelo da sessão em andamento. Por isso
o hook só injeta contexto, orientando o Claude a delegar subtarefas ao subagente
com o modelo indicado (ferramenta Agent, parâmetro model). Para trocar o modelo
da sessão inteira, use scripts/jev-claude.

Opt-in: só roda com JEV_ROUTER_HINT=1 (evita custo/latência em todo prompt).
"""

from __future__ import annotations

import json
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent.parent))

from jev.jev_client import JevError, available  # noqa: E402
from jev.policies import route  # noqa: E402


def main() -> int:
    if os.environ.get("JEV_ROUTER_HINT") != "1" or not available():
        return 0
    try:
        event = json.load(sys.stdin)
        prompt = event.get("prompt", "")
        if len(prompt.strip()) < 15 or prompt.lstrip().startswith("/"):
            return 0
        out = route(prompt)
    except (JevError, json.JSONDecodeError):
        return 0  # sem decisão: segue o modelo atual, nada é inventado
    ctx = (
        f"[Jev router] tier sugerido: {out['decisao']} → modelo {out['modelo']} "
        f"({'; '.join(out['motivos'])}). Se delegar subtarefas via Agent, use model=\"{out['modelo']}\"."
    )
    if out["requer_humano"]:
        ctx += " Pedido de risco jurídico: trabalhe em modo conservador e sinalize revisão do advogado."
    print(json.dumps({"hookSpecificOutput": {"hookEventName": "UserPromptSubmit", "additionalContext": ctx}}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
