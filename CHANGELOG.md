# Changelog — Cativa Design System

## 1.2.0 — a camada de componentes (2026-08-10)

> Bump que existia para acontecer desde o gate do D-28: o pacote tinha **tokens de sobra e zero componente implementado**. Origem: exportação do projeto de design, triada pela @Nina em `../triagem-pacote-2026-08-10.md`.

- **GAP-DS-016 FECHADA — as receitas viram classes.** Nasce `css/cativa.components.css` (463 linhas, 32 componentes). As 4 receitas do `AGENTS §4` eram `style=""` inline e a CSP sem `unsafe-inline` as bloqueava: seguir o DS ao pé da letra produzia tela que a segurança reprovava. O contrato continua sendo o token; mudou o veículo.
- **GAP-DS-015 FECHADA — existe padrão de shell standalone.** `.cds-shell`, `.cds-sidebar`, `.cds-topbar`, `.cds-main`, `.cds-grid`, `.cds-stack`.
- **Tokens: superset compatível.** Mesma paleta, valor por valor; `px` → `rem` (conversões exatas na base 16). ~30 tokens novos, incluindo os de layout que faltavam: `--cds-sidebar-w`, `--cds-touch-min`, `--cds-content-max`, `--cds-scrim`, `--cds-lh-*`, `--cds-on-danger|success|warning`, `--cds-z-*`.
- ⚠️ **QUEBRA:** `--cds-duration` deixou de existir, substituído por `--cds-duration-fast|base|slow`. Sem alias de compatibilidade (a régua é substituir > acumular). Consumidor migrado no mesmo delta.
- **A11y adicionada na exportação, não herdada:** `:focus-visible`, `prefers-reduced-motion`, `.cds-sr-only`, alvos ≥ `--cds-touch-min`. A origem tinha **zero** `role`, `aria-*` e `:focus-visible`.
- **Documentação por componente** (`components/`): quando NÃO usar, anatomia, variantes, TODOS os estados **com os inexistentes declarados**, API, contrato de a11y e ícones.
- **Não entrou:** o gráfico de área (SVG desenhado à mão — viola a regra 4 do próprio AGENTS) e a marca de 4 círculos (idem; e a regra white-label do sponsor tornou o pedido obsoleto).

## 1.1.0
- **GAP-DS-008 (multi-tenant):** camada `tenant-theming.css` + helper `tenant-theming.js` (`applyTenantTheme`). `--cds-primary` sobrescrevível por tenant; `-strong`/`-soft` derivam via color-mix; `-on-primary` por contraste. AGENTS §7.
- **GAP-DS-009:** allowlist curada de ícones Lucide (`tokens/lucide-allowlist.json`).
- **GAP-DS-010:** guia de self-host de fontes p/ CSP restrito (`integrations/self-host-fonts.md`).
- **GAP-DS-011:** `package.json` (`@cativa/design-tokens`) com `exports` versionáveis.
- **GAP-DS-012:** linter anti-hardcode (`scripts/lint-tokens.mjs`) para o CI.

## 1.0.0
- Tokens iniciais: cores (dark+light), tipografia, espaçamento, raios, elevação.
- Iconografia: família Lucide, linha 1.5px.
- Referência navegável com fundações + biblioteca de componentes.
- Contrato de agentes (AGENTS.md) + guardrails de segurança.
