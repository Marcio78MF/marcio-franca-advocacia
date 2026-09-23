"""CLI da Jev Decision Layer.

    python3 -m jev.cli status
    python3 -m jev.cli ask      < pedido.json        # {"state": ..., "questions": {...}}
    python3 -m jev.cli triagem  < state.json         # também: radar, acao
    python3 -m jev.cli route "texto do pedido"
    python3 -m jev.cli guard Bash '{"command": "git push --force"}'

Saída: tabela Markdown (padrão) ou JSON (--json). Código de saída 3 = Jev
indisponível/falhou: NENHUMA decisão foi tomada.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

if __package__ in (None, ""):
    sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
    __package__ = "jev"

from .decisions import table  # noqa: E402
from .jev_client import JevError, JevUnavailable, resolve_backend, system_one  # noqa: E402
from .policies import POLICIES, load, route, tool_guard  # noqa: E402
from .redact import redact  # noqa: E402

EXIT_NO_DECISION = 3


def _read_json(path: str | None) -> dict:
    raw = Path(path).read_text(encoding="utf-8") if path else sys.stdin.read()
    return json.loads(raw)


def _policy_table(out: dict) -> str:
    lines = [
        "| pergunta | tipo | resposta | p | confidence |",
        "|---|---|---|---|---|",
    ]
    for row in out["jev"].values():
        conf = "—" if row["confidence"] is None else f"{row['confidence']:.2f}"
        lines.append(f"| {row['id']} | {row['tipo']} | {row['resposta']} | {row['p']:.2f} | {conf} |")
    lines.append("")
    lines.append(f"**Decisão:** `{out['decisao']}` · **requer humano:** {'sim' if out['requer_humano'] else 'não'}")
    for m in out["motivos"]:
        lines.append(f"- {m}")
    extras = {k: v for k, v in out.items() if k not in ("decisao", "requer_humano", "motivos", "jev", "meta")}
    for k, v in extras.items():
        lines.append(f"- {k}: {v}")
    meta = out["meta"]
    usage = meta.get("usage") or {}
    lines.append(f"\n_{meta.get('backend')} · {meta.get('model')} · {usage.get('input_tokens', '?')} tokens · {meta.get('latency_ms')} ms_")
    return "\n".join(lines)


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(prog="jev", description="Jev Decision Layer (decide, não escreve).")
    ap.add_argument("--json", action="store_true", help="saída JSON bruta")
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("status", help="mostra backend e política carregada")
    p_ask = sub.add_parser("ask", help="questions livres: JSON {state, questions, model?}")
    p_ask.add_argument("--file")
    p_ask.add_argument("--no-redact", action="store_true", help="não mascarar CPF/e-mail/telefone/segredos")
    for name in POLICIES:
        p = sub.add_parser(name, help=f"política {name} de jev/legal_policies.json")
        p.add_argument("--file")
    p_route = sub.add_parser("route", help="escolhe tier/modelo para um pedido")
    p_route.add_argument("pedido", nargs="+")
    p_route.add_argument("--base", choices=["mechanical", "ordinary", "hard"])
    p_guard = sub.add_parser("guard", help="testa o hook de ferramenta")
    p_guard.add_argument("tool")
    p_guard.add_argument("tool_input")
    args = ap.parse_args(argv)

    try:
        if args.cmd == "status":
            try:
                b = resolve_backend()
                print(f"Jev: OK · backend={b['name']} · url={b['url']} · model={b['model']}")
            except JevUnavailable as err:
                print(f"Jev: SEM CHAVE — {err}")
                return EXIT_NO_DECISION
            print(f"Políticas: {', '.join(k for k in load('legal_policies.json') if isinstance(load('legal_policies.json')[k], dict))}")
            return 0

        if args.cmd == "ask":
            req = _read_json(args.file)
            state = req["state"] if args.no_redact else redact(req["state"])
            result = system_one(state, req["questions"], model=req.get("model"), tag="ask")
            print(json.dumps(result, ensure_ascii=False, indent=2) if args.json else table(result, req["questions"]))
            return 0

        if args.cmd == "route":
            out = route(" ".join(args.pedido), args.base)
        elif args.cmd == "guard":
            out = tool_guard(args.tool, json.loads(args.tool_input))
        else:
            out = POLICIES[args.cmd](_read_json(args.file))
        print(json.dumps(out, ensure_ascii=False, indent=2) if args.json else _policy_table(out))
        return 0
    except JevError as err:
        msg = {"erro": str(err), "decisao": None, "aviso": "Jev indisponível: nenhuma decisão foi tomada nem simulada. Escalar para humano."}
        print(json.dumps(msg, ensure_ascii=False, indent=2) if args.json else f"**Jev falhou:** {err}\n\n{msg['aviso']}")
        return EXIT_NO_DECISION


if __name__ == "__main__":
    sys.exit(main())
