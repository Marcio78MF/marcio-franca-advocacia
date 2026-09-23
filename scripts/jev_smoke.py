#!/usr/bin/env python3
"""Smoke test do Jev: 1 chamada, 3 questions, caso FICTÍCIO (lote rural no Acre)."""

from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from jev import JevError, JevUnavailable, system_one  # noqa: E402
from jev.decisions import choice, noul, score, table  # noqa: E402

COMO_CRIAR_KEY = """\
Jev sem chave configurada. Para criar e exportar:
  1. Acesse https://console.typesafe.ai e faça login.
  2. Gere uma API key no console e copie o valor (guarde em local seguro).
  3. export TYPESAFE_API_KEY='sua-chave'   (ou grave em .env na raiz; ver .env.example)
  4. Alternativa: export OPENROUTER_API_KEY='...' (endpoint alpha /api/alpha/decisions).
  5. Rode de novo: python3 scripts/jev_smoke.py"""

# Caso fictício — nomes, números e matrícula inventados só para teste.
STATE = {
    "canal": "formulário do site",
    "mensagem": (
        "Boa tarde. Comprei há 12 anos um lote rural de 40 ha no ramal do km 18 da "
        "BR-364, em Senador Guiomard/AC. Tenho contrato de compra e venda e recibos, "
        "mas a matrícula no cartório ainda está em nome do antigo dono, que faleceu. "
        "O ITERACRE fez vistoria na região ano passado. Quero regularizar para "
        "conseguir financiamento no banco. Não tenho processo aberto."
    ),
}

QUESTIONS = {
    "area": choice(
        "Qual área de atuação do escritório corresponde principalmente a esta demanda?",
        {
            "fundiario": "Regularização fundiária, REURB, usucapião, matrícula, ITERACRE, posse e registro de imóveis.",
            "previdenciario": "Benefícios do INSS ou RPPS.",
            "bancario_consumidor": "Contratos bancários, cobranças, relação de consumo.",
            "familia": "Divórcio, alimentos, guarda, inventário como questão principal.",
            "penal": "Inquérito, ação penal, prisão.",
            "ambiental": "Autuação ou licenciamento ambiental como questão principal.",
            "outro": "Nenhuma das anteriores.",
        },
    ),
    "matricula_divergente": noul(
        "O registro imobiliário (matrícula) descrito em `mensagem` está em nome de pessoa diferente do atual possuidor?"
    ),
    "urgencia": score(
        "Qual a urgência de atendimento desta demanda?",
        [
            "baixa: sem prazo, audiência, prisão, leilão, despejo ou perda iminente de direito",
            "media: há interesse econômico ou prazo em semanas/meses, sem risco imediato",
            "alta: prazo processual, prisão, ordem de despejo/reintegração, leilão ou perda de direito em dias",
        ],
    ),
}


def main() -> int:
    try:
        result = system_one(STATE, QUESTIONS, tag="smoke")
    except JevUnavailable:
        print(COMO_CRIAR_KEY)
        return 2
    except JevError as err:
        print(f"FALHA: {err}\nNenhuma decisão foi inventada.", file=sys.stderr)
        return 1
    print(table(result, QUESTIONS))
    if "--json" in sys.argv:
        print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
