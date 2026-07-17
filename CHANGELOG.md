# Changelog — Cativa Design System

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
