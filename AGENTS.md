# Cativa Design System — Contrato para Agentes

> **Cole este arquivo no system prompt de todo agente** que gera UI embedada na Cativa.
> É a regra contratual: o output só é aceito se seguir o que está aqui.

## 1. Identidade visual (o que significa "parecer nativo")
- **Dark-first.** O tema padrão é escuro, quase-preto neutro levemente frio. Tema claro existe e deve funcionar sem retrabalho.
- **Primária violeta** para ações e destaque. Superfícies neutras empilhadas (bg → surface → surface-2 → surface-3).
- **Editorial + funcional.** Títulos de herói/seção em serif (Newsreader); toda a UI em sans (Onest); IDs/código em mono (JetBrains Mono).
- **Ícones de linha** (Lucide), traço 1.5px, cantos arredondados. Sem emoji.
- Cantos generosos, pills, badges em caixa-alta com letter-spacing, chips de variação, selos hexagonais.

## 2. Regras inegociáveis
1. **NUNCA hardcode cor, fonte, raio, sombra ou espaçamento.** Use exclusivamente `var(--cds-*)` (ou o preset Tailwind). Um hex cru no output = rejeitado.
2. **Herde o tema E o tenant.** Não force `background` fixo — use `var(--cds-bg)`. O host injeta `data-theme` (dark/light) e a **cor primária do tenant** em `--cds-primary` (ver §7). O embed só reage; nunca lê `customer.colors` direto para pintar.
3. **Não redefina os tokens.** Consuma `cativa.tokens.css`; nunca sobrescreva `:root`.
4. **Ícones só da allowlist Lucide** (`tokens/lucide-allowlist.json`, GAP-DS-009). Fora dela, só com aprovação da @Nina. Não desenhe SVG próprio além de formas triviais (círculo, losango, hexágono de selo).
5. **Contraste AA — e agora um script mede, em vez de um checkbox perguntar.** Texto sobre surface usa `--cds-text`/`--cds-text-2`; **nunca `--cds-text-3` para conteúdo essencial** (medido: reprova AA sobre as quatro superfícies, nos dois temas). ⛔ **Não pinte texto que precisa de AA sobre um fundo `*-soft`**: eles são **translúcidos**, o contraste depende do que está atrás e o componente não pode garantir o próprio — use `.cds-badge--dot` (opaco, AA por construção). Rode `node scripts/lint-contrast.mjs` (§6). O que já reprovava quando a guarda nasceu está **declarado** em `scripts/contrast-allowlist.json`, com valor medido e dono — **entrada lá não é aprovação, é dívida visível**.
6. **Alvos de toque ≥ 44px** em contexto mobile.
7. **Fonte de UI = Onest; serif só em herói/título de seção.** Nunca serif em corpo, label, botão ou input.

## 3. Tokens (referência rápida)
Cores (troque `X` por dark/light — o host controla): `--cds-bg`, `--cds-surface`, `--cds-surface-2`, `--cds-surface-3`, `--cds-border`, `--cds-border-strong`, `--cds-text`, `--cds-text-2`, `--cds-text-3`, `--cds-primary`, `--cds-primary-strong`, `--cds-primary-soft`, `--cds-on-primary`, `--cds-success[-soft]`, `--cds-danger[-soft]`, `--cds-warning[-soft]`, `--cds-info[-soft]`.
Espaço: `--cds-space-2xs..3xl` (4/8/12/16/24/32/48/64). Raio: `--cds-radius-sm/md/lg/xl/pill`. Sombra: `--cds-shadow-raised/overlay/glow`.

## 4. Receitas de componente (padrão canônico)
**Botão primário**
```html
<button style="display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border:none;border-radius:var(--cds-radius-md);background:var(--cds-primary);color:var(--cds-on-primary);font:600 14px var(--cds-font-sans);cursor:pointer;box-shadow:0 6px 20px -6px var(--cds-primary)">Ação</button>
```
**Card**
```html
<div style="background:var(--cds-surface);border:1px solid var(--cds-border);border-radius:var(--cds-radius-lg);padding:var(--cds-space-lg)">…</div>
```
**Input**
```html
<input style="width:100%;padding:12px 14px;border-radius:var(--cds-radius-md);background:var(--cds-surface-2);border:1px solid var(--cds-border);color:var(--cds-text);font:400 14px var(--cds-font-sans);outline:none">
<!-- foco: border-color:var(--cds-primary); box-shadow:0 0 0 3px var(--cds-primary-soft) -->
```
**Badge / tag** — pill caixa-alta: `padding:5px 11px;border-radius:var(--cds-radius-pill);font:700 11px/1 var(--cds-font-sans);letter-spacing:.08em`. Semântica: fundo `*-soft`, texto na cor cheia.
**Chip de variação** — positivo: `--cds-success-soft`+`--cds-success`; negativo: `--cds-danger-*`.
**Título de herói/seção** — `font-family:var(--cds-font-serif);font-weight:600;letter-spacing:-.02em`.

> A referência viva e navegável de TODOS os componentes é **Cativa Design System.dc.html**. Trate-a como o "storybook".

## 5. Guardrails de segurança (embed)
- **Sem dependências externas em runtime** além de fontes Google e do bundle Lucide já aprovados. Nada de CDNs arbitrárias, tracking ou `eval`.
- **Sanitize toda entrada** antes de renderizar (nomes, comentários, HTML de usuário) — escape por padrão; nunca `innerHTML` com dado não confiável.
- **Isolamento:** o embed não lê/escreve `localStorage`/cookies do host fora do seu namespace `cds:`/`<app>:`. Não navegue o `window.top`.
- **Sem segredos no cliente.** Chaves de API ficam no backend; o embed fala com endpoints assinados.
- **CSP-friendly:** sem `style`/`script` inline injetados dinamicamente a partir de dados; estilos vêm de tokens.
- **Degradação:** se um token faltar, use o fallback do próprio `var(--cds-x, <fallback>)` — nunca quebre o layout.

## 7. Multi-tenant — cor primária por cliente (GAP-DS-008 · RESOLVIDO)
O DS traz violeta como **default**, mas `--cds-primary` é feito para ser **sobrescrito em runtime por tenant**. Isso reconcilia o DS com `cativa-integration/module-blueprint.md §7` (`customer.colors.quaternary`):

- **Quem injeta:** o HOST (não o agente). Carregue `integrations/tenant-theming.css` **depois** de `cativa.tokens.css` e chame `applyTenantTheme(customer)` (de `integrations/tenant-theming.js`) na montagem do embed.
- **O que acontece:** o helper seta `--cds-primary` = `customer.colors.quaternary` e calcula `--cds-on-primary` por contraste (AA). `--cds-primary-strong` e `--cds-primary-soft` **derivam sozinhos** via `color-mix` — não precisa injetar cada variante.
- **Regra do agente:** continue usando só `var(--cds-primary)`/`-strong`/`-soft`/`-on-primary`. **Nunca** leia `customer.colors` nem hardcode a cor do tenant. Se nenhuma cor vier, o violeta default prevalece.
- **Escopo:** para múltiplos tenants na mesma página, aplique no wrapper do embed (`applyTenantTheme(customer, wrapperEl)`), não no `:root`.
- ⚠️ **O que a guarda de contraste NÃO cobre:** ela mede o **arquivo de tokens**, e o acento do tenant é escrito em **runtime**. `applyTenantTheme` recalcula `--cds-on-primary` por contraste, mas `--cds-primary-soft` continua derivando por `color-mix` com `transparent` — ou seja, **translúcido**, e portanto fora do alcance de qualquer número fixo. É mais uma razão para o texto que precisa de AA não morar sobre `*-soft`.

## 6. Checklist de aceite (o agente valida antes de entregar)
- [ ] Zero valores crus de cor/fonte/raio/sombra — só `var(--cds-*)`.
- [ ] Funciona em dark E light (alternando `data-theme`) E com `--cds-primary` de tenant sobrescrito.
- [ ] Só ícones Lucide; sem emoji; sem SVG ilustrativo desenhado à mão.
- [ ] Serif apenas em herói/título; corpo e controles em Onest.
- [ ] Contraste AA **medido, não afirmado**: `node scripts/lint-contrast.mjs` passa (guarda de contraste, WCAG 2.1, os dois temas). Junto com `node scripts/lint-tokens.mjs <arquivos>` — um pega hardcode, o outro pega contraste, e **nenhum dos dois pega o que o outro pega**.
- [ ] Alvos ≥44px no mobile.
- [ ] Nenhuma dependência/endpoint fora da allowlist; entradas sanitizadas.
