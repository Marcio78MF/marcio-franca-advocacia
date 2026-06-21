@AGENTS.md

# Escritorio Marcio Franca Advocacia

## Contexto Juridico

Escritorio de advocacia com atuacao no Estado do Acre e Tribunais Superiores, especializado nas seguintes areas.

## Areas de Atuacao

### Direito Civil
- Contratos, obrigacoes, responsabilidade civil
- Direito de familia e sucessoes
- Direito imobiliario e registral
- Acoes de cobranca, execucao de titulo extrajudicial
- Acoes indenizatorias (danos morais e materiais)
- Direito do consumidor (CDC)

### Direito Administrativo
- Licitacoes e contratos administrativos
- Concursos publicos
- Processo administrativo disciplinar
- Mandado de seguranca
- Improbidade administrativa
- Servidor publico (estatutario e celetista)

### Direito Previdenciario
- Aposentadorias (por idade, tempo de contribuicao, especial, por invalidez)
- Auxilio-doenca e auxilio-acidente
- Pensao por morte e salario-maternidade
- Beneficio de prestacao continuada (BPC/LOAS)
- Revisoes de beneficios
- Planejamento previdenciario (RGPS e RPPS)

### Direito Criminal
- Defesa em inqueritos e acoes penais
- Habeas corpus e liberdade provisoria
- Crimes contra o patrimonio, a pessoa e a administracao publica
- Execucao penal (progressao de regime, livramento condicional)
- Tribunal do Juri
- Recursos criminais (apelacao, RESE, embargos, REsp, RE)

### Direito Tributario
- Execucoes fiscais (defesa e embargos)
- Mandado de seguranca tributario
- Acoes declaratorias e anulatórias de debito fiscal
- Planejamento tributario
- Exclusao e parcelamento de divida ativa
- Imunidades e isencoes

## Ferramentas e Sistemas

| Ferramenta | Finalidade |
|---|---|
| **SISBAJUD** | Sistema de busca de ativos financeiros do Poder Judiciario (penhora online, desbloqueio, teimosinha) |
| **RENAJUD** | Restricao e consulta de veiculos vinculados a processos judiciais |
| **E-Proc** | Sistema de processo eletronico da Justica Federal (TRF1, Secao Judiciaria do Acre) |
| **SIREA** | Sistema de Informacoes do Regime Estatutario do Acre |
| **DJEN** | Diario da Justica Eletronico Nacional — publicacoes e intimacoes |
| **JusBrasil** | Pesquisa de jurisprudencia, acompanhamento processual e consulta de diarios oficiais |

## Jurisprudencia — Tribunais de Referencia

| Tribunal | Sigla | Ambito |
|---|---|---|
| Superior Tribunal de Justica | **STJ** | Uniformizacao de legislacao federal, recurso especial |
| Tribunal Regional Federal | **TRF** | Recursos da Justica Federal em geral |
| Tribunal Regional Federal da 1a Regiao | **TRF1** | Jurisdicao que abrange o Acre (Justica Federal) |
| Tribunal de Justica do Acre | **TJAC** | Justica Estadual do Acre (apelacoes, agravos, mandados de seguranca) |

## Ferramentas MCP Disponiveis

- **JUS_RATIO**: Pesquisa jurisprudencial semantica (STF, STJ e demais tribunais). Usar `pesquisar_documentos` para buscar decisoes, `obter_documento` para inteiro teor, `timeline_decisoes` para evolucao de teses.

## Agentes Especializados

Os agentes em `.claude/agents/` cobrem o fluxo completo do escritorio:

- `orquestrador.md` — Coordena os demais agentes conforme a demanda
- `redator-civel.md` — Redacao de pecas civeis
- `redator-criminal.md` — Redacao de pecas criminais
- `especialista-previdenciario.md` — Pecas e calculos previdenciarios
- `especialista-consumidor.md` — Defesa do consumidor
- `agente-execucao.md` — Fase de execucao e cumprimento de sentenca
- `agente-jbp.md` — Juizado, bloqueio e penhora (SISBAJUD/RENAJUD)
- `pesquisador-juridico.md` — Pesquisa de jurisprudencia e doutrina
- `revisor-juridico.md` — Revisao tecnica e adequacao de pecas
- `gestor-prazos.md` — Controle de prazos processuais e intimacoes
