---
description: Traduz uma pergunta em questions tipadas (choice/score/noul) e pede a decisão ao Jev
argument-hint: <pergunta em linguagem natural>
allowed-tools: Bash(python3 -m jev.cli:*), Bash(python3 jev/cli.py:*), Write
---

Pergunta do usuário: $ARGUMENTS

Você é o TRADUTOR, não o decisor. Siga exatamente:

1. Se a pergunta se encaixa numa política pronta (triagem de mensagem, radar/minuta,
   ação de agente, escolha de modelo), use `python3 -m jev.cli <triagem|radar|acao|route>`
   com o state adequado. Caso contrário, siga para o passo 2.
2. Monte o `state` com TODOS os fatos necessários que o usuário forneceu (campos
   nomeados). Não acrescente fatos que ele não deu.
3. Traduza a pergunta em 1 a 5 questions tipadas sobre esse mesmo state:
   - escolha entre opções → `choice` (critérios com descrição; inclua "outro/nenhum" se couber)
   - posição numa escala → `score` (níveis `rótulo: descrição concreta`, do menor para o maior)
   - afirmação verdadeira/falsa → `noul`
4. Grave o JSON `{"state": ..., "questions": {...}}` em
   `/tmp/jev_pedido.json` e rode:
   `python3 -m jev.cli ask --file /tmp/jev_pedido.json`
5. Devolva ao usuário a tabela `pergunta | tipo | resposta | p | confidence | ação sugerida`
   exatamente como o CLI retornou (você pode refinar a coluna "ação sugerida" com
   base nos números, sem alterar resposta, p ou confidence), seguida das questions
   que você enviou, para auditoria.
6. Se o comando falhar (saída 3 ou erro), informe o erro e diga: "Nenhuma decisão
   foi tomada." NUNCA invente a resposta, as probabilidades ou a confiança.
7. Confiança < 0,4 ou noul entre 0,35 e 0,65 → a ação sugerida é escalar ao advogado.
   Lembre que o resultado não é conselho jurídico final.
