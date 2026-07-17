# Resposta aos Gaps — Cativa DS (para @Nina)
_Atualizado 2026-07-16 · pacote v1.1.0_

## Resolvido nesta rodada (dentro do pacote)

| ID | O que entreguei | Onde |
|----|-----------------|------|
| **GAP-DS-008** 🟢 | **A contradição não existe mais.** O DS é *default violeta* + *override por tenant*. Host carrega `tenant-theming.css` e chama `applyTenantTheme(customer)` → seta `--cds-primary` de `customer.colors.quaternary`; `-strong`/`-soft` derivam via `color-mix`, `-on-primary` por contraste AA. Agente segue usando só o token. | `integrations/tenant-theming.{css,js}`, AGENTS §7 |
| **GAP-DS-009** 🟢 | Allowlist curada (~90 ícones em 8 grupos) + política de exceção. | `tokens/lucide-allowlist.json` |
| **GAP-DS-010** 🟡→🟢(guia) | Guia de self-host woff2 + template `@font-face`; tokens não mudam. Falta só a **decisão** de onde hospedar. | `integrations/self-host-fonts.md` |
| **GAP-DS-011** 🟡 | `package.json` `@cativa/design-tokens` com `exports` prontos p/ npm privado/submodule. Falta a **decisão** npm vs submodule (@Ricardo/@Victor). | `package.json` |
| **GAP-DS-012** 🟢 | Linter anti-hardcode plugável no CI (rejeita #hex, rgb/hsl e px mágico fora de `var(--cds-*)`). | `scripts/lint-tokens.mjs` · `npm run lint:tokens` |

## Precisa de decisão humana (fora do meu alcance)
- **GAP-DS-008 (confirmação @Claudio):** confirmar que `customer.colors.quaternary` é mesmo o slot da primária (e não outro índice). O mecanismo já suporta qualquer slot — é só apontar.
- **GAP-DS-010:** publicar woff2 no pacote vs CDN interno.
- **GAP-DS-011:** npm privado vs git submodule + política da cópia vendorada.
- **GAP-DS-006 / 007:** gate visual da @Michele e handoff @Yuri/@Arthur→@Nina — processo/sponsor, não artefato de DS.

## Como aplicar (host, por tenant)
```html
<link rel="stylesheet" href="@cativa/design-tokens/css">
<link rel="stylesheet" href="@cativa/design-tokens/tenant.css">
<script type="module">
  import { applyTenantTheme } from '@cativa/design-tokens/tenant';
  applyTenantTheme(customer);           // ou applyTenantTheme(customer, embedWrapper)
</script>
```
