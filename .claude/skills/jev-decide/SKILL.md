---
name: jev-decide
description: Use quando precisar DECIDIR (classificar, escolher entre opções definidas, pontuar numa escala ou estimar a probabilidade de uma afirmação) e não escrever — triagem de mensagem de cliente, área do direito, urgência, dados sensíveis LGPD, destino de minuta, captação x conteúdo informativo (OAB), próxima ação de agente, risco de comando, escolha de modelo. Chama o Jev (TypeSafe System One), que devolve choice/score/noul com probabilidade e confiança. Não use para redigir peças, pareceres ou código.
---

# jev-decide — decisões tipadas via Jev

O Jev **decide**; você (Claude) **escreve**. Quando a tarefa pedir um julgamento
entre alternativas conhecidas, chame o Jev em vez de decidir "no achismo".

## Regras invioláveis

1. **Nunca simule o Jev.** Se o comando falhar (código de saída 3), diga que não
   houve decisão e escale para o advogado. Não preencha a resposta você mesmo.
2. **Confiança < 0,4 → escalar** (humano ou você em modo conservador), não executar.
3. O Jev **não dá conselho jurídico final**. Peça, parecer e estratégia sempre
   passam por revisão do advogado.
4. **LGPD**: o CLI já mascara CPF, CNPJ, e-mail, telefone, documentos e segredos.
   Não desligue (`--no-redact`) com dado real de cliente.
5. Agrupe várias questions sobre o **mesmo state** numa só chamada.

## Políticas prontas (preferir)

Estão em `jev/legal_policies.json`; o código aplica as regras sobre as respostas.

```bash
# A) triagem de entrada — state: {canal, mensagem, historico?}
echo '{"canal":"whatsapp","mensagem":"..."}' | python3 -m jev.cli triagem
# B) radar/minuta — state: {tipo, texto, finalidade}
python3 -m jev.cli radar --file minuta_state.json
# C) próxima ação do agente — state: {objetivo, observacoes, acao_proposta}
python3 -m jev.cli acao --file acao_state.json
# roteador de modelo
python3 -m jev.cli route "texto do pedido"
```

Acrescente `--json` para consumir o resultado em código (`decisao`, `requer_humano`, `motivos`, `jev`).

## Questions livres

Monte um JSON `{"state": ..., "questions": {...}}` e envie a `python3 -m jev.cli ask`:

- **choice** — `{"type":"choice","instructions":"...","criteria":{"rotulo":"descrição", ...}}`
  (≥ 2 rótulos; inclua uma opção "nenhum/outro" quando nada puder servir)
- **score** — `{"type":"score","instructions":"...","criteria":["nivel0: situação concreta", "nivel1: ...", ...]}`
  (níveis ordenados do menor para o maior, formato `rótulo: descrição`)
- **noul** — `{"type":"noul","instructions":"afirmação/pergunta sim-não", "criteria":{"true":"...","false":"..."}}`
  (resposta = probabilidade de "sim"; 0,5 significa incerteza, não "meio termo")

Boas práticas (guia oficial TypeSafe): uma questão = um julgamento estreito;
toda a informação necessária vai no `state` (campos nomeados, referenciados com
crases, ex.: `` `mensagem` ``); o id da questão NÃO é enviado ao modelo, então a
`instructions` precisa ser autoexplicativa.

## Interpretação

| primitiva | valor | confiança |
|---|---|---|
| choice | rótulo escolhido + probabilidade de cada rótulo | `confidence` (concentração da distribuição) |
| score | valor esperado (pode ser fracionário) → nível arredondado | `confidence` |
| noul | probabilidade de "sim" (0–1) | não há; 0,35–0,65 = incerto |

Mais contexto oficial: skill `/typesafe:typesafe-ai` (plugin `typesafe@typesafe-ai`).
