"""Minimização de dados (LGPD, art. 6º, III) antes de enviar state a API externa.

Substitui identificadores por marcadores ([CPF], [EMAIL]...). O marcador preserva
o sinal semântico ("havia um CPF aqui") sem transmitir o dado.
"""

from __future__ import annotations

import json
import re
from typing import Any

_PATTERNS: list[tuple[re.Pattern, str]] = [
    # Segredos primeiro, para não vazarem em comandos de terminal.
    (re.compile(r"(?i)\b(bearer)\s+[A-Za-z0-9._\-]{12,}"), r"\1 [SEGREDO]"),
    (re.compile(r"(?i)\b([A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD|SENHA)[A-Z0-9_]*)\s*=\s*\S+"), r"\1=[SEGREDO]"),
    (re.compile(r"\b(?:sk|pk|rk|ghp|gho|github_pat|xox[abpr])[-_][A-Za-z0-9_\-]{16,}\b"), "[SEGREDO]"),
    (re.compile(r"\b\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}\b"), "[CNPJ]"),
    (re.compile(r"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b"), "[CPF]"),
    (re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+"), "[EMAIL]"),
    (re.compile(r"(?:\+?55\s?)?\(?\b\d{2}\)?\s?9?\d{4}-?\d{4}\b"), "[TELEFONE]"),
    (re.compile(r"(?i)\b(?:rg|nis|pis|nit|cns)\s*(?:n[ºo.]?\s*)?[:\-]?\s*[\d.\-/]{5,}"), "[DOCUMENTO]"),
]


def redact_text(text: str) -> str:
    for pattern, repl in _PATTERNS:
        text = pattern.sub(repl, text)
    return text


def redact(value: Any, max_chars: int | None = None) -> Any:
    """Redige recursivamente strings em dicts/listas; trunca strings longas."""
    if isinstance(value, str):
        out = redact_text(value)
        if max_chars and len(out) > max_chars:
            out = out[:max_chars] + f"… [+{len(out) - max_chars} caracteres omitidos]"
        return out
    if isinstance(value, dict):
        return {k: redact(v, max_chars) for k, v in value.items()}
    if isinstance(value, list):
        return [redact(v, max_chars) for v in value]
    return value


def compact(value: Any, max_chars: int) -> str:
    """Serializa e redige, limitando o tamanho total (controle de custo/latência)."""
    text = value if isinstance(value, str) else json.dumps(value, ensure_ascii=False)
    return redact(text, max_chars)
