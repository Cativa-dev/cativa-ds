# Fontes: Google `<link>` vs self-host (GAP-DS-010)

## Recomendação
- **Hosts Cativa padrão:** `<link>` do Google Fonts é aceitável (é a exceção explícita no AGENTS §5).
- **Embeds com CSP estrito ou offline:** faça **self-host** (woff2) para não depender de `fonts.gstatic.com`.

## Como self-hostar (uma vez, no pipeline do DS — não no agente)
1. Baixe os woff2 das 3 famílias e coloque em `cativa-ds/fonts/`:
   - Onest (400,500,600,700,800), Newsreader (400,500,600), JetBrains Mono (400,500).
2. Sirva sob o próprio domínio do host e substitua o `<link>` por este `@font-face` (adicione `font-src 'self'` ao CSP):
```css
@font-face{font-family:'Onest';src:url('/fonts/onest-600.woff2') format('woff2');font-weight:600;font-display:swap}
/* repita por peso/família — Newsreader (serif), JetBrains Mono (mono) */
```
3. Os tokens (`--cds-font-*`) **não mudam** — só a origem do arquivo muda. Fallbacks (`system-ui`, `Georgia`, `ui-monospace`) garantem degradação.

> **Decisão pendente do time:** publicar os woff2 no pacote (`@cativa/design-tokens/fonts`) ou hospedar num CDN interno da Cativa. Até lá, `<link>` Google é o default.
