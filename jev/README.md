# Jev Decision Layer

Camada de **decisão** para o Claude Code do escritório. O Jev (TypeSafe AI, System One)
responde perguntas tipadas — `choice`, `score`, `noul` — com probabilidade e confiança.
Ele **não escreve** texto nem código e **não dá conselho jurídico final**: quem escreve é o
Claude, quem decide o mérito é o advogado.

Python 3.9+ só com a biblioteca padrão (não entra no build do Next.js).

## 1. Chave

```bash
cp .env.example .env            # e preencha TYPESAFE_API_KEY=  (o .env é ignorado pelo git)
# ou
export TYPESAFE_API_KEY='...'   # chave criada em https://console.typesafe.ai
python3 -m jev.cli status       # confere backend e modelo
```

Alternativa: `OPENROUTER_API_KEY` → endpoint **alpha** `https://openrouter.ai/api/alpha/decisions`
(não é `chat/completions`; pode mudar — ajuste `OPENROUTER_DECISIONS_URL`).

## 2. Smoke test

```bash
python3 scripts/jev_smoke.py          # tabela
python3 scripts/jev_smoke.py --json   # resposta completa
```

Caso fictício: lote rural em Senador Guiomard/AC com matrícula em nome de terceiro falecido.
Sem chave, o script explica como configurar e sai com código 2. Testes offline:
`python3 -m unittest discover -s jev/tests -t .`

## 3. Peças

| Arquivo | Função |
|---|---|
| `jev/jev_client.py` | `system_one(state, questions, model="jev-latest")`, retry em 408/429/5xx (respeita `Retry-After`), log de tokens/latência em `jev/logs/jev_calls.jsonl` (sem conteúdo) |
| `jev/redact.py` | mascara CPF, CNPJ, e-mail, telefone, RG/NIT/NIS e segredos antes de enviar |
| `jev/policies.py` | regras explícitas sobre as respostas (guarda, roteador, triagem, radar, ação) |
| `jev/harness_policies.json` | questions e thresholds do hook e do roteador |
| `jev/legal_policies.json` | políticas do escritório A/B/C |
| `jev/cli.py` | `status`, `ask`, `triagem`, `radar`, `acao`, `route`, `guard` |
| `jev/hooks/pre_tool_use.py` | hook PreToolUse (Bash/Write/Edit/MultiEdit/NotebookEdit/apply_patch) |
| `jev/hooks/user_prompt_router.py` | dica de modelo por prompt (opt-in `JEV_ROUTER_HINT=1`) |
| `scripts/jev-claude` | abre o Claude Code no modelo escolhido pelo Jev |
| `.claude/skills/jev-decide/` | skill que o Claude usa quando precisa decidir |
| `.claude/commands/jev.md` | comando `/jev <pergunta>` |

## 4. Hook de ferramentas

Registrado em `.claude/settings.json`. Para cada Bash/Write/Edit:

1. **Código primeiro**: comando só de leitura (`ls`, `git status`…) passa sem chamar a API;
   linha vermelha (`rm -rf`, `git push --force`, `.env`, `vercel --prod`, `curl | sh`…) → no mínimo `ask`.
2. **Jev** (1 chamada, 3 questions): `destrutividade` (score rotina/atenção/perigoso),
   `dano_real` (noul: produção, dinheiro, dados irrecuperáveis ou processo judicial real), `decisao` (choice allow/ask/deny).
3. **Regras**: `deny` se destrutividade ≥ 1,5 com confiança ≥ 0,6; senão `ask` se confiança < 0,4
   ou `dano_real` > 0,7; senão segue o choice.

`allow` do Jev **não** dispensa as permissões do Claude Code (`trust_allow: false`); o hook
só deixa de interferir. Sem chave: valem só as regras em código. API falhou: `ask`.
Desligar: `JEV_GUARD=off`. Auditoria: `jev/logs/guard_decisions.jsonl`.

## 5. Roteador de modelo

`complexidade` (mechanical/ordinary/hard) → haiku/sonnet/opus, a partir do tier base `ordinary`:
upgrade se confiança ≥ 0,3; downgrade só se ≥ 0,6; `risco_juridico` > 0,7 força `hard`.

```bash
python3 -m jev.cli route "padronize os nomes dos PDFs da pasta de um cliente"
scripts/jev-claude "elabore a estratégia recursal contra sentença de improcedência em REURB"
```

O Claude Code não permite que um hook troque o modelo da sessão em andamento; por isso o
`jev-claude` escolhe o modelo **ao abrir** a sessão, e o hook opcional só sugere o modelo para subagentes.

## 6. Políticas do escritório

```bash
python3 -m jev.cli triagem --file jev/exemplos/triagem_inss_urgente.json
python3 -m jev.cli radar   --file jev/exemplos/radar_post_captacao.json
python3 -m jev.cli acao    --file jev/exemplos/acao_protocolo.json
```

Nada aqui envia mensagem, publica conteúdo ou protocola peça: a saída é uma sugestão
com `requer_humano`. Os exemplos são fictícios.

## 7. Calibração

Os thresholds são ponto de partida. Rode os exemplos e casos reais anonimizados, compare com
a decisão do advogado e ajuste os JSON. O guia oficial recomenda validar no domínio antes de confiar.
