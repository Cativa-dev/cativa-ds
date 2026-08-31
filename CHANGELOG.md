# Changelog — Cativa Design System

## 1.5.0 — o **dito** ganha veículo (2026-08-31)

> Fecha a **GAP-DS-040**, aberta no gate da forma (A) em 2026-08-30 e reforçada no gate da cascata do horizonte em 2026-08-31. Spec da @Nina (`fabric-platform` · `laudo-nina-cascata.md` §7), que também é quem a auditou: **não é componente novo — é extensão aditiva do `.cds-banner`**.

- **GAP-DS-040 FECHADA — nasce `.cds-banner--dito`.** O pacote não tinha veículo para uma classe de mensagem que as doutrinas de estudo exigem: a afirmação que **permanece até ser reconhecida** ou **até o fato que a motivou deixar de valer**, e que pode **carregar a ação que resolve o fato**. Medido nos quatro candidatos existentes, e **os quatro morrem**: `.cds-banner` é persistente mas o verbete diz *"sem botão fechar, sem ação"* e *"dispensável/fechado NÃO EXISTE"* · `.cds-announce` tem ação mas **não é dispensável**, é global no topo e warning-only · **toast** é efêmero, e a doutrina o proíbe **nominalmente** · **modal** bloqueia. **Nenhum dos quatro servia, e eram todos os que existiam.**
- **Duas partes novas:** `.cds-banner__actions` (1 ação, 2 no máximo; `--secondary`/`--ghost`, ⛔ **nunca `--primary`**) e `.cds-banner__ack` (o reconhecimento, `.cds-btn--icon` + `x` com `aria-label` real). Mais `.cds-banner__body`, o envelope que deixa o `__ack` ancorar sem empurrar o texto.
- 🔴 **Um estado que nenhum design system tem: `extinto por fato`.** A peça morre **sem ato da pessoa** quando o fato deixa de valer — a vida dela é presa a um **predicado de fato**, não a uma sessão e não a um relógio. O verbete **obriga o consumidor a declarar esse predicado**. ⛔ E o estado `reconhecível` morre **só pelo ato**: sem `setTimeout`, sem auto-hide, sem saída por relógio. **Qualquer duração fixa é a violação** — não é preferência, é a cláusula que a peça existe para servir.
- **Âncora `--inline`** (colada ao controle que motivou a mensagem), que serve *"a razão no mesmo ato"* sem exigir um segundo componente.
- **7 regras de contrato no verbete**, e elas são o produto tanto quanto o CSS. A que mais custa: *"o reconhecimento é do EVENTO, nunca do assunto"* — guardar por assunto faz o **segundo** fato da mesma espécie sair em silêncio. E a nº 4: *"a ação pode ABRIR uma entrada; o dito nunca CONTÉM a entrada"* — é o que impede o banner-formulário.
- **Nada foi inventado.** A ação compõe de `.cds-btn--secondary/--ghost`, o reconhecimento de `.cds-btn--icon`, a entrada de `.cds-modal` + `.cds-field` + `.cds-input`, e os ícones `x`/`info`/`check-circle-2`/`alert-triangle` **já estavam na allowlist**.
- **Por que MINOR e não major:** aditivo puro — nenhuma classe renomeada, nenhuma removida, nenhum token alterado. O `.cds-banner` sem `--dito` se comporta **exatamente** como na v1.4.0. `lint:tokens` ✅ (zero hardcode).
- ⚠️ **O que esta versão NÃO faz:** ela entrega o **veículo**, não o **uso**. Cada consumidor ainda precisa declarar o predicado de fato e a casa durável da ação (regras 2 e 6). **Pacote com a peça ≠ produto com o dito certo** — quem homologa a superfície é o gate visual, não o bump.

## 1.4.0 — o pacote passa a entregar o que promete (2026-08-11)

> Fecha o **P5** do D-31 (`arquitetura-alvo.md` §4.3), que é pré-requisito declarado da extração para repo próprio. Medido: `files` listava `tokens`, `integrations` e `scripts` — e **não** `css/`, `components/` nem `icons/`. Consequência: um consumidor que instalasse a v1.3.0 receberia os tokens e **não receberia o design system** — nem `cativa.components.css` (as 32 classes da v1.2.0), nem o `.cds-skeleton` recém-nascido, nem os ícones inline. A entrega da própria versão não saía do pacote.

- **`files` passa a incluir `css`, `components` e `icons`.** Sem isso, `npm pack`/`npm install` publicava um pacote sem a camada de componentes.
- **`exports` ganha as duas entradas que faltavam:** `./components.css` → `css/cativa.components.css` (o veículo das receitas desde a v1.2.0) e `./icons/inline` → `icons/lucide-inline.json`. A chave `./icons` **permanece** apontando para a allowlist (`tokens/lucide-allowlist.json`) — são duas coisas diferentes e continuam distinguíveis.
- **Zero mudança de conteúdo.** Nenhum token, nenhuma classe, nenhum doc alterado — é correção de **empacotamento**. Por isso é minor e não patch: o que o pacote entrega muda.
- **Por que agora:** a ordem do §4.3 é `B-1 → bump com o slot correto + correção de files/exports → extração → submódulo`. Extrair antes desta correção carregaria o defeito para o repo novo e o tornaria a fonte de verdade dele.

## 1.3.0 — skeleton (2026-08-11)

> Fecha o GAP-DS-027, achado no gate do módulo Flashcards (`laudo-nina.md`, B-2): o pacote não tinha veículo para o estado `carregando` do "Contrato de estado de dado" (`components.md`) — só o spinner de botão (`.cds-btn__spinner`, escopo diferente) e o contrato **proíbe** spinner de página inteira. Sem o veículo, os 4 caminhos de carregamento do piloto usavam o spinner proibido.

- **GAP-DS-027 FECHADA — nasce `.cds-skeleton`.** Bloco de carregamento (`surface-2` → shimmer `surface-3`, `border-radius-sm`), variantes `--text` (linha, empilhável) e `--circle` (avatar/ícone), e a composição `.cds-metric__value.cds-skeleton` (caixa do número da Métrica — é exatamente o "esqueleto na caixa do número" do contrato). Respeita `prefers-reduced-motion`. Zero hardcode (`lint:tokens` ✅).
- **Documentação:** item 33 em `components/COMPONENTS-02.md`; exemplo de estado `carregando` na Métrica (item 7); `components.md` §Contrato de estado de dado aponta para a implementação.
- **Não entrou:** skeleton de linha de tabela (composição específica de `.cds-table__row`) e "estado vazio de tabela" — seguem ausentes, sem gap novo aberto para não duplicar o que já está registrado.
- **Correção de doc:** a célula `carregando` do contrato citava `--cds-duration` — token removido na v1.2.0 (substituído por `--cds-duration-fast|base|slow`). Referência corrigida; a animação do shimmer usa duração própria (`1.6s`, mesmo padrão do `.cds-btn__spinner`, que já hardcoda `0.7s`).

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
