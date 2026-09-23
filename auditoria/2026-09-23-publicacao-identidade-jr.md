# Auditoria — Publicação e identidade (Dr. Márcio Jr. França, OAB/AC 2.882)

**Data:** 23/09/2026
**Site:** LP BPC/LOAS — `https://bpc.marciofranca.adv.br`
**Objetivo:** publicar tudo em `bpc.marciofranca.adv.br` sem concorrer com `www.marciofranca.adv.br`, com o e-mail oficial e SEO correto.
**DNS:** nada foi alterado nos registros `www` e `@`.

## Decisões fixadas

| Item | Valor final |
|---|---|
| E-mail oficial | `marciosantosfranca@gmail.com` (`SITE_CONFIG.email`) |
| Domínio canônico | `https://bpc.marciofranca.adv.br` (`SITE_CONFIG.url`) |
| Página indexável | somente a home `/` |
| Sitemap | somente `/` |

## O que foi feito

### 1. E-mail oficial (LGPD)
- `lib/data.ts`: `SITE_CONFIG.email = 'marciosantosfranca@gmail.com'`.
- Varredura sem ocorrências restantes de `contato@marciofrancaadvocacia.com.br` e `contato@marciofranca.adv.br`.
- `contato/ContatoClient.tsx` e `politica-de-privacidade/page.tsx` exibem `SITE_CONFIG.email` (nada fixo no código).
- `components/Footer.tsx` e `components/Navbar.tsx` (não existe `Header.tsx`) não exibem e-mail.

### 2. Domínio (opção B — subdomínio `bpc`)
- `app/layout.tsx`: `metadataBase = new URL('https://bpc.marciofranca.adv.br')`.
- `app/sitemap.ts`: `base = 'https://bpc.marciofranca.adv.br'`.
- `app/robots.ts`: `Sitemap: https://bpc.marciofranca.adv.br/sitemap.xml`.
- `lib/data.ts`: `SITE_CONFIG.url = 'https://bpc.marciofranca.adv.br'`.
- `lib/seo.ts` (canonical, Open Graph, Schema.org) e `atendimento/rio-branco` (Schema.org) passaram a usar `SITE_CONFIG.url`.
- Nenhuma ocorrência de `marciofrancaadvocacia.com.br` no projeto.

### 3. Title duplicado
- `app/layout.tsx`: `title = { default: 'Márcio Jr. França - Advogado BPC LOAS Rio Branco Acre | OAB/AC 2.882', template: '%s | Márcio Jr. França Advocacia' }`.
- `lib/seo.ts`: `gerarMetadata` retorna `title: titulo` puro; o sufixo vem só do template.
- Resultado: `/sobre` → `Sobre o Escritório | Márcio Jr. França Advocacia` (sem duplicar).
- Observação: a home define título próprio da LP (`BPC/LOAS negado em Rio Branco? …`), por isso o `default` do layout só aparece em rotas sem título.

### 4. Canonical em `/contato`
- `contato/page.tsx` é server component com `metadata` (canonical `https://bpc.marciofranca.adv.br/contato`) e renderiza `ContatoClient.tsx` (formulário, comportamento inalterado).
- `gerarMetadata` recebe objeto: `gerarMetadata({ titulo, descricao, slug })`.

### 5. SEO — sem duplicar `www.marciofranca.adv.br`
- `gerarMetadata({ noIndex: true })` passou a gerar `noindex, follow` (antes `noindex, nofollow`).
- `noindex, follow`: `/sobre`, `/contato`, `/avaliacoes`, `/atendimento`, `/atendimento/online`, `/atendimento/rio-branco`, `/politica-de-privacidade`.
- **Também `noindex, follow`** (regra "só a home indexável"): `/blog`, `/blog/*`, `/triagem` e as páginas de área (`/bpc-loas-rio-branco`, `/bpc-loas`, `/familia`, `/criminal` etc.).
- Home `/`: `index, follow`.
- `app/sitemap.ts`: lista apenas `https://bpc.marciofranca.adv.br` (evita "URL noindex enviada no sitemap" no Search Console).

## Validação (build local de produção, `next start`)

| Verificação | Resultado |
|---|---|
| `npm run build` | passou limpo (51 páginas) |
| `grep "marciosantosfranca@gmail.com" lib/data.ts` | encontrado |
| `grep -r "marciofrancaadvocacia.com.br" app lib components` | vazio |
| `curl /sitemap.xml \| grep bpc.marciofranca.adv.br` | 1 URL (`/`) |
| `/robots.txt` | `Sitemap: https://bpc.marciofranca.adv.br/sitemap.xml` |
| `<title>` de `/sobre` | `Sobre o Escritório \| Márcio Jr. França Advocacia` |
| robots da home | `index, follow` |
| robots das demais rotas | `noindex, follow` |
| canonical | `https://bpc.marciofranca.adv.br/<rota>` em todas |

## Pendências / atenção
- As páginas `/bpc-loas-rio-branco` e `/bpc-loas` são do mesmo tema da LP. Se forem mantidas só no subdomínio `bpc` (sem equivalente no `www`), vale reavaliar se devem voltar a ser indexáveis. Para isso: remover `noIndex: true` em `app/(site)/[area]/page.tsx` apenas para esses slugs e incluí-las no sitemap.
- Search Console: cadastrar a propriedade `https://bpc.marciofranca.adv.br`, enviar o sitemap e acompanhar a remoção das URLs noindex.
- O branch `principal` tem commits (GA4, Clarity, verificação do Search Console) que não estão no `main`. Conferir qual branch a Vercel publica.
