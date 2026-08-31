# Changelog — Cativa Design System

## 1.6.1 — 🔴 a guarda estava medindo uma configuração que ninguém serve (2026-08-31)

> **A v1.6.0 corrigiu um número e a correção estava errada.** Está aqui em vez de escondida num
> *amend*, porque o defeito é instrutivo e é da mesma família do **BUG-015** que ela própria abriu.

- 🔴 **A guarda lia UM arquivo; o consumidor carrega DOIS.** `lint-contrast.mjs` media
  `tokens/cativa.tokens.css` e parava ali. Mas todo consumidor carrega `integrations/tenant-theming.css`
  **depois** — e ele **redefine `--cds-primary-soft` para 14% nos DOIS temas**, sobrescrevendo os 10%
  que o tema claro declara nos tokens. ⇒ **a guarda produzia um número que nenhuma tela mostra.**
  *(Medido no produto: `site/index.html` do `fabric-platform` inline os dois blocos, nessa ordem.)*
- ⚠️ **Consequência direta: o `4,34:1` original da GAP-DS-041 estava CERTO, e a "correção" da v1.6.0
  é que estava errada.** Não era "alfa do tema escuro com cores do claro" — era a **configuração
  operativa**, com o `tenant-theming.css` carregado. A escada real do que se serve é
  **4,62** (`surface`) · **4,34** (`bg`) · **4,17** (`surface-2`) · **3,87** (`surface-3`); a que a
  v1.6.0 publicou (**4,91 / 4,61 / 4,42 / 4,10**) só existe se ninguém carregar o tenant-theming.
  🔒 **A lição do BUG-015 sobrevive intacta — e fica mais afiada:** o defeito das duas medições
  anteriores **não era o alfa**, era **nenhuma das duas declarar a premissa** (*quais folhas estão
  carregadas*). Sem a premissa, o número não é nem verificável nem falsificável, e "reproduzi" não
  quer dizer nada.
- ✅ **A guarda passa a medir a CASCATA**, na ordem real (`tokens` → `tenant-theming`), e a imprime
  no cabeçalho para que a premissa fique na tela em vez de na cabeça de quem rodou. Resolve
  `color-mix(in srgb, var(--X) N%, transparent)` — sem isso o token derivado viraria *"não é cor
  sólida"* e o par **sumiria da medição**, deixando a guarda cega exatamente onde o consumidor está.
- ✅ **`--tenant <hex>`, modo diagnóstico** — reescreve `--cds-primary` como o `applyTenantTheme` faz
  e mostra o que **aquele** cliente recebe. Nasceu para **liquidar uma divergência**: o mesmo par
  circulava em duas versões medidas de memória (**1,27/1,66** no `gaps.md` × **1,44/1,77** no gate).
  **Medido agora: `#facc15` → 1,44:1 · `#9cca04` → 1,76:1** (tema claro, melhor superfície). Os do
  `gaps.md` estavam errados.
- ⛔ **E o modo tenant NÃO é gate, dito no próprio output.** Não dá para travar CI contra uma cor que
  só existe no banco do cliente. A allowlist descreve o acento **padrão** e por isso fica **muda** ali
  — reportar "entrada obsoleta" porque a cor de **um** cliente passou seria mandar apagar uma dívida
  real do DS. **Quem garante contraste sob acento arbitrário é o componente que não depende de cor:
  `.cds-badge--dot`.**
- **Por que PATCH:** nenhum token, nenhuma classe, nenhum verbete de componente mudou — mudou o que a
  **ferramenta** lê. O passivo declarado segue com **os mesmos 17 pares e os mesmos valores** (só
  `--cds-primary-soft` é redefinido pelo tenant-theming, e o par do tema escuro já era 14%).
- **Provado em 5 casos**, não 4: regressão nova (`exit 1`) · piora de par declarado (`exit 1`) ·
  entrada obsoleta (`exit 1`) · cascata real intocada (`exit 0`) · **e o caso novo — medir só os
  tokens dá `4,10…4,91`, medir a cascata dá `3,87…4,62`**, o que prova que a cascata está mesmo sendo
  aplicada em vez de declarada.

## 1.6.0 — o contraste deixa de ser uma pergunta de checklist (2026-08-31)

> Spec da @Nina (`fabric-platform` · `laudo-nina-contraste.md`), aberta para fechar a **GAP-DS-041** e a **GAP-DS-038**. 🔴 **A GAP-DS-041 NÃO é fechada aqui** — o badge acessível passa a existir, e o `--primary` **continua reprovando onde já reprovava**. Fechar seria dizer que o sistema está AA, e ele não está.

- 🔴 **Nasce `scripts/lint-contrast.mjs` — a guarda que faltava, e ela é o produto desta versão.** `lint-tokens` verificava **hardcode**. Nada verificava **contraste**: um par podia nascer reprovando AA e **nenhum gate veria** — nem o checklist de aderência, que *pergunta* "contraste AA?" e depende de alguém medir à mão, nem a QA, que roda o linter que existe. A guarda mede **todo par semântico** do arquivo de tokens, **nos dois temas**, com WCAG 2.1 sobre os valores reais. **Guard executável > guard textual.**
- 🔴 **E a primeira coisa que ela mediu foi que a documentação estava mentindo — em dois verbetes.** O do Botão afirmava `--cds-on-primary` sobre `--cds-primary` *"≈ 4.6:1 no escuro (AA, no limite)"*: são **4.23:1**, e **reprova**. O do Badge afirmava que *"cor cheia sobre `*-soft` atende AA em ambos os temas"*: no **tema claro os quatro reprovam** até na superfície mais favorável (`success` 3.34 · `danger` 4.01 · `warning` 2.86 · `info` 3.27). O que salvava a frase antiga era a ressalva *"não medido caso a caso"* — **ninguém tinha medido**. Ambas corrigidas com o valor medido.
- **O passivo nasce DECLARADO, não verde por conveniência:** `scripts/contrast-allowlist.json`, **17 pares** que reprovam AA hoje, cada um com valor medido, data e dono (**sponsor** — é decisão de marca × acessibilidade, não de implementação). A guarda falha em **regressão nova**, em **piora de um par declarado** e em **entrada obsoleta** (par que passou a passar e não foi removido — para o passivo não apodrecer). ⛔ **Entrada na allowlist NÃO é aprovação: é dívida visível com dono.**
- **A guarda achou mais do que a auditoria humana.** O laudo tinha medido 4 pares sólidos reprovando; ela achou **17** — a família inteira do `--cds-text-3` (reprova sobre as 4 superfícies, nos 2 temas) e a família *soft* no tema claro, que nenhuma inspeção manual tinha aberto.
- ⚠️ **Correção de medição, dita como correção** — 🔴 **e ela mesma estava errada; ver a v1.6.1:** o número original da GAP-DS-041 (*"4,34:1"*) e a tabela do laudo estavam **errados** — usavam o alfa `0.14` do `--cds-primary-soft` do tema **escuro** com as cores do tema **claro**. Com o alfa real (`0.10`), a escada é **4.91** (`surface`) · **4.61** (`bg`) · **4.42** (`surface-2`) · **4.10** (`surface-3`). A **conclusão não muda** — o contraste depende do que está atrás — mas reproduzir um número **repetindo o método** não é verificá-lo, e por isso a guarda passa a ser a autoridade sobre o número.
- **GAP-DS-041 (parcial) — nasce `.cds-badge--dot`.** A saída **não é escolher cores melhores: é parar de depender delas.** Chip **opaco** (`--cds-surface-2` + `--cds-text` + `--cds-border`) com um **ponto semântico** (`.cds-badge__dot--*`) carregando o significado. **AA por construção** — *(medido: 15.63:1 no escuro, 15.85:1 no claro)* — independente de token de marca, do acento do tenant e do fundo, porque a superfície é **opaca**. Mesmo vocabulário do `.cds-status__dot`, que o pacote já tinha. ⛔ **Cor nunca é o único portador:** o texto do chip diz o estado. As 5 variantes coloridas **ficam** (remover seria *major*).
- **GAP-DS-038 FECHADA — nascem `.cds-btn--block` e `.cds-action-card`.** `--block` é uma linha (`display:flex; width:100%`) e existe para **matar um hardcode que o `lint-tokens` não pega**: `width:100%` cru não é cor, fonte, raio, sombra nem espaço, então passa pelo linter — e por isso todo mundo escrevia à mão. `.cds-action-card` reusa a **forma do `.cds-stat`**, com a ação dentro. ⛔ **Não é um `.cds-btn` gigante:** o card não é clicável, o botão é — e a diferença é de leitor de tela e de abrir-em-nova-aba, não de estética. Por isso o card **não tem** `:hover` nem `:focus-visible`: prometeria uma interação que não entrega.
- **O pacote ganha CI (`.github/workflows/guards.yml`).** Ele não tinha nenhum: os dois linters existiam e **nada os rodava** — que é a mesma doença de um checklist textual, um nível acima. Rodam aqui, e não no consumidor, porque uma regressão de contraste nasce **quando o token muda**, neste repo. ⚠️ Sem proteção de branch exigindo o check, o guard **informa e não trava** — e o workflow já nasce dizendo isso em vez de fingir.
- **Por que MINOR e não major, medido e não alegado:** 256 → 268 regras CSS · **0 seletores removidos** · **0 corpos alterados** · **12 regras novas, todas ancoradas numa classe de entrada nova** ⇒ nenhum markup existente passa a casar com regra nova. `lint:tokens` ✅ · `lint:contrast` ✅.
- ⚠️ **O que esta versão NÃO faz — e é o item mais importante da lista:** ela **não conserta os 4 pares sólidos de marca que reprovam AA**, `.cds-btn--primary` no tema *default* entre eles. Consertar significa mudar `--cds-primary`, `--cds-danger`, `--cds-on-success` ou `--cds-on-warning` — **valores canônicos de marca**, e a regra do token real proíbe cravá-los por conveniência de um número. **É do sponsor**, com a medição na mão, e as duas saídas são legítimas: ajustar o token, ou aceitar AA-large para texto grande e declarar. Também **não existe `--cds-on-info`** — o `info` é o único semântico sem par sólido.

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
