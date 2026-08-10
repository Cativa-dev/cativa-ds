# Iconografia — inventário

**Biblioteca: Lucide** (`lucide`). Estilo linha, `stroke-width: 1.5`, cantos
arredondados. **Nenhum ícone é desenhado à mão** (duas exceções em
INCOERENCIAS.md: a marca "cativa" e o gráfico de área).
Tamanhos em uso: `0.75rem`, `1rem`, `1.0625rem`, `1.125rem`, `1.375rem`.
Cor: sempre `currentColor`. **Sem emoji em nenhum lugar.**

## Como o destino deve renderizar
A origem carrega Lucide por **CDN** (`unpkg.com`) e chama
`lucide.createIcons()` em runtime — **isso viola as restrições 1 e 3 do
destino**. O destino precisa de uma destas rotas, nenhuma delas pronta aqui:
1. SVG inline no HTML (recomendado; sem JS, sem rede) — copie o path do ícone Lucide.
2. Sprite SVG local + `<use href="#icon-x">`.
3. Pacote `lucide-static` servido do próprio domínio.

Estado do empacotamento local: **[ESPECIFICADO]** — não existe sprite nem
cópia local no pacote.

## Ícones usados, por componente (nomes exatos Lucide)

| Componente | Ícones |
|---|---|
| Button | `plus`, `download`, `trash-2`, `check`, `settings` |
| Field / Input | `search` |
| Select | `chevron-down` |
| Checkbox | `check` |
| Badge / Tag | `video`, `monitor`, `globe` |
| Chip de variação | `trending-up`, `trending-down` |
| Seal | `star`, `crown`, `shield-check` |
| Points pill | `coins` |
| Notificação | `bell` |
| Sidebar / Nav | `layout-dashboard`, `palette`, `type`, `ruler`, `layers`, `shapes`, `mouse-pointer-click`, `text-cursor-input`, `badge-check`, `square-stack`, `gauge`, `menu`, `table`, `copy`, `bell-ring`, `line-chart`, `home`, `gallery-vertical-end`, `layout-grid`, `message-square`, `bookmark` |
| Alternador de tema | `sun`, `moon` |
| Topbar | `search`, `bell` |
| Breadcrumb | `chevron-right` |
| Pagination | `chevron-left`, `chevron-right` |
| Table | `star` (no selo) |
| Metric card | `user-round`, `graduation-cap`, `clock` |
| Stat | `book-open`, `play`, `layers` |
| Card ambiente | `wifi`, `log-in`, `flame` |
| Content card | `clock`, `play` |
| Ranking | `trophy` |
| Modal | `trash-2`, `x` |
| Popover | `x`, `settings-2`, `plus` |
| Toast | `check`, `x` |
| Banner | `info`, `check-circle-2`, `alert-triangle` |
| Announcement bar | `megaphone` |
| Overview (página) | `palette`, `component`, `shapes` |
| Grade de amostra | `home`, `info`, `bar-chart-2`, `users`, `trophy`, `book-open`, `credit-card`, `palette`, `bot`, `plug`, `smartphone`, `bell`, `message-circle`, `search`, `calendar`, `filter`, `zap`, `plus`, `download`, `upload`, `chevron-down`, `chevron-right`, `heart`, `share-2`, `check`, `x`, `flame`, `wifi`, `log-in`, `eye`, `sparkles`, `play`, `layers`, `clock`, `mail`, `file-text`, `settings`, `trash-2`, `pencil`, `more-horizontal` |

## Allowlist curada
Existe uma allowlist em `cativa-ds/tokens/lucide-allowlist.json` (8 grupos,
~90 nomes). Estado: **[ESPECIFICADO]** — é uma lista escrita, **nunca foi
validada contra o código** nem usada por nenhuma ferramenta. Alguns ícones
realmente usados na origem (`component`, `gallery-vertical-end`) estão nela;
não verifiquei os 90 um a um.
