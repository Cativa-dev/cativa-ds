# Cativa Design System — Pacote de Distribuição

Fonte única de verdade para que apps embedados pareçam nativos da Cativa.

## Estrutura
```
cativa-ds/
├─ AGENTS.md                      ← contrato p/ agentes (vai no system prompt)
├─ README.md · CHANGELOG.md
├─ tokens/
│  ├─ cativa.tokens.css           ← CSS vars, dark + light  (importe SEMPRE)
│  ├─ cativa.tokens.json          ← tokens estruturados (build tools / diff)
│  ├─ cativa.tokens.ts            ← tokens tipados (TS/React)
│  └─ lucide-allowlist.json       ← ícones permitidos
├─ css/
│  └─ cativa.components.css       ← a camada de COMPONENTES (classes .cds-*)
├─ components/                    ← o verbete de cada componente (contrato de uso)
├─ icons/                         ← Lucide inline
├─ scripts/
│  ├─ lint-tokens.mjs             ← guard de HARDCODE
│  ├─ lint-contrast.mjs           ← guard de CONTRASTE (WCAG 2.1, dark + light)
│  └─ contrast-allowlist.json     ← passivo DECLARADO de contraste (dívida com dono)
│     (`--tenant <hex>` mede o que UM cliente recebe — diagnóstico, não gate)
├─ integrations/
│  ├─ tailwind.preset.js          ← preset Tailwind mapeando as vars
│  └─ tenant-theming.css/.js      ← cor primária por tenant (applyTenantTheme)
└─ reference/
   └─ Cativa Design System.html   ← "storybook" navegável (fonte visual)
```

## Uso mínimo (qualquer stack)
1. Adicione as fontes no `<head>` (link em cativa.tokens.css).
2. Importe `tokens/cativa.tokens.css` **uma vez** no embed.
3. Estilize só com `var(--cds-*)`. O host controla o tema via `data-theme="dark|light"`.

## React / Tailwind
- `import cds from './cativa-ds/tokens/cativa.tokens.ts'` para valores em JS.
- `presets: [require('./cativa-ds/integrations/tailwind.preset.js')]` para utilitários (`bg-surface`, `text-text-2`, `rounded-lg`, `shadow-glow`…).

## Como distribuir com segurança para o time de agentes
- **Versione** este diretório num repositório privado (ex.: `@cativa/design-tokens`). Use SemVer: mudança de valor = minor, remoção/renome de token = major.
- **Publique como pacote** (npm privado ou Git submodule). Agentes consomem a versão fixada (`^1.0.0`), nunca `main`.
- **Um único dono** edita os tokens; PRs com review. **Os dois guards rodam no CI do próprio pacote** (`.github/workflows/guards.yml`): `lint-tokens` rejeita hex cru, `lint-contrast` rejeita **regressão de contraste** (medindo a **cascata** `tokens` → `tenant-theming`, que é o que o consumidor carrega) — e **nenhum dos dois pega o que o outro pega**. ⚠️ Sem proteção de branch exigindo o check, eles informam e não travam.
- **Injete `AGENTS.md` no system prompt** de cada agente e valide o output contra o checklist da seção 6.
- **Não exponha** este repositório publicamente se contiver roadmap/telemetria; o pacote em si é só design, mas mantenha o pipeline no seu perímetro.

## Governança de versão
| mudança | bump |
|---|---|
| novo token, novo componente | minor |
| ajuste de valor de token existente | minor (documentar no CHANGELOG) |
| renome/remoção de token | major |
