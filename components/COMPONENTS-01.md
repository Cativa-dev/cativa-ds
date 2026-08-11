# C. Componentes — parte 1 (mais usados)

> **Como ler.** Cada componente traz: estado real, para que serve, quando NÃO
> usar, anatomia, variantes, TODOS os estados (com os inexistentes declarados),
> tamanhos, API, contrato de a11y, código e ícones.
>
> **Sobre "API/props":** o projeto de origem **não é uma biblioteca de
> componentes**. É markup com estilo inline dentro de um único arquivo. Não
> existe componente com props tipadas para nenhum item deste documento. O que
> a coluna API descreve são os **atributos HTML/classes que o CSS exportado
> reconhece** — esse é o contrato real no destino sem build step.
>
> **Sobre a11y:** o código de origem tem **zero `role`, zero `aria-*`, zero
> `tabindex` e zero `:focus-visible`** (auditado por varredura nesta sessão).
> Tudo que aparece como contrato de a11y abaixo está marcado
> **[ADIÇÃO-A11Y]** quando não existe na origem, ou **[AUSENTE]** quando não
> foi resolvido nem aqui. Nenhuma conformidade é afirmada sem base.
>
> **Biblioteca de ícones: Lucide** (`lucide`, estilo linha, stroke 1.5).
> Nenhum ícone é SVG desenhado à mão — exceto duas violações declaradas em
> INCOERENCIAS.md (marca e gráfico de área).


---

## 1. Button — `.cds-btn`
**Estado: [IMPLEMENTADO]** (renderizado neste projeto, seção "Botões")

**Para que serve:** disparar uma ação. Uma ação primária por área de decisão.

**Quando NÃO usar (antipadrão):**
- Para navegar entre páginas — use `<a>`. Botão que navega quebra abrir-em-nova-aba.
- Dois `--primary` na mesma área: destrói a hierarquia (o glow existe justamente para haver um só).
- `--danger` para ação reversível. O soft-danger é para destrutivo real.
- Como rótulo/tag: badge não é botão.

**Anatomia:** `[ícone opcional] + rótulo + [ícone opcional]`; variante `--icon` é só glifo (exige rótulo acessível).

**Variantes:** `--primary`, `--secondary`, `--ghost`, `--danger` (soft), `--danger-solid`, `--success` (soft), `--icon`.

**Estados:**
| Estado | Existe? | Como |
|---|---|---|
| repouso | sim | por variante |
| hover | sim | primary→`--cds-primary-strong`; secondary→`surface-3`; ghost→`surface-2`; danger/success→ganha borda da cor |
| focus-visible | **[ADIÇÃO-A11Y]** | não existia; agora `outline: 2px solid var(--cds-primary)`, offset 2px |
| ativo/pressionado | **NÃO EXISTE** | não há `:active` na origem e não foi inventado |
| desabilitado | sim | `:disabled` → surface-2 + text-3, sem sombra, `cursor: not-allowed` |
| carregando | sim | `data-loading="true"` → opacidade .55 + `.cds-btn__spinner` |
| vazio | n/a | |
| erro | **NÃO EXISTE** | botão não tem estado de erro |
| selecionado | **NÃO EXISTE** | use `.cds-segmented` |
| somente-leitura | **NÃO EXISTE** | |

**Tamanhos:** `--sm` (0.375/0.75rem, fs-xs), padrão (0.625/1.125rem, fs-ui), `--lg` (0.8125/1.5rem, fs-body). Altura mínima do padrão e `--icon` = `--cds-touch-min` (2.75rem).

**API (atributos reconhecidos):**
| nome | tipo | default | obrigatório |
|---|---|---|---|
| `class` variante | enum acima | `.cds-btn` sem variante = sem cor | sim (escolher uma) |
| `disabled` | boolean | false | não |
| `data-loading` | `"true"` | ausente | não |
| `aria-label` | string | — | **sim quando `--icon`** |
| `type` | submit/button | button no HTML exportado | sim em formulário |

**A11y:** role nativo `button`. Teclado: Enter/Espaço nativos. Ordem de foco = ordem do DOM. Alvo ≥ 2.75rem (padrão e icon; **`--sm` tem 2rem e NÃO atende os 44px** — declarado). Contraste: `--cds-on-primary` sobre `--cds-primary` ≈ 4.6:1 no escuro (AA texto normal, no limite); soft-variants usam cor cheia sobre soft (AA). `data-loading` **não** anuncia nada — falta `aria-busy`: **[AUSENTE]**.

**Ícones (Lucide):** `plus`, `download`, `trash-2`, `check`, `settings`.

```html
<button type="button" class="cds-btn cds-btn--primary">
  <svg class="cds-icon cds-icon--sm" data-lucide="plus" aria-hidden="true"></svg>
  Primária
</button>

<button type="button" class="cds-btn cds-btn--secondary">
  <svg class="cds-icon cds-icon--sm" data-lucide="download" aria-hidden="true"></svg>
  Secundária
</button>

<button type="button" class="cds-btn cds-btn--ghost">Ghost</button>

<button type="button" class="cds-btn cds-btn--danger">
  <svg class="cds-icon cds-icon--sm" data-lucide="trash-2" aria-hidden="true"></svg>
  Excluir
</button>

<button type="button" class="cds-btn cds-btn--primary" data-loading="true" aria-busy="true">
  <span class="cds-btn__spinner" aria-hidden="true"></span>
  Carregando
</button>

<button type="button" class="cds-btn cds-btn--primary" disabled>Desabilitado</button>

<button type="button" class="cds-btn cds-btn--icon" aria-label="Configurações">
  <svg class="cds-icon" data-lucide="settings" aria-hidden="true"></svg>
</button>
```

---

## 2. Card — `.cds-card`
**Estado: [IMPLEMENTADO]**

**Para que serve:** agrupar conteúdo relacionado numa superfície elevada sobre `--cds-bg`.

**Quando NÃO usar:** card dentro de card (a escada de superfícies só tem 3 degraus — aninhar achata a hierarquia); para uma única linha de texto; como botão gigante (card não tem estado de foco).

**Anatomia:** superfície + borda 1px + raio `lg` + padding `lg`. Opcional: `.cds-card__header` (título + ação), `.cds-card__halo` (halo ambiente), `.cds-card__body`.

**Variantes:** base, `--flush` (sem padding, conteúdo sangra), `--raised`, `--overlay`, `--glow` (borda + glow da primária), `--ambient` + `__halo--{primary|success|warning|danger|info}`.

**Estados:** repouso **sim**. hover **NÃO EXISTE** (nenhum card da origem tem hover). focus-visible **NÃO EXISTE** (card não é focável). ativo, desabilitado, carregando, vazio, erro, selecionado, somente-leitura: **nenhum existe**.

**Tamanhos:** único. A largura vem da grade.

**API:** só classes. Nenhum atributo.

**A11y:** sem role (é `div`/`section`). Se o card tiver título, use `<section aria-labelledby>` — **[ADIÇÃO-A11Y]**, não existe na origem. Não é focável, não entra na ordem de foco.

**Ícones:** nenhum próprio.

```html
<div class="cds-card">…</div>

<section class="cds-card cds-card--ambient" aria-labelledby="c1">
  <div class="cds-card__halo cds-card__halo--success" aria-hidden="true"></div>
  <div class="cds-card__body">
    <h3 id="c1" class="cds-card__title">Usuários conectados</h3>
    <p class="cds-small">11 online</p>
  </div>
</section>
```

---

## 3. Field / Input — `.cds-field`, `.cds-input`
**Estado: [IMPLEMENTADO]**

**Para que serve:** entrada de texto de uma linha.

**Quando NÃO usar:** para escolher entre opções conhecidas (use select/segmented); para texto longo (textarea); como caixa de busca sem `type="search"` e sem rótulo acessível.

**Anatomia:** `.cds-field` > rótulo caixa-alta + controle + (mensagem de erro). Com adornos: `.cds-inputgroup` > ícone-prefixo + input + sufixo (atalho `⌘K`).

**Variantes:** simples, com ícone-prefixo, com sufixo de atalho, inválido.

**Estados:**
| Estado | Existe? | Como |
|---|---|---|
| repouso | sim | surface-2 + borda |
| hover | **NÃO EXISTE** | |
| foco | sim (na origem, via `:focus`) | borda primária + anel `0 0 0 3px --cds-primary-soft` |
| focus-visible | herda o `:focus` acima | |
| desabilitado | **[ADIÇÃO]** | não existia; regra `:disabled` acrescentada |
| somente-leitura | **[ADIÇÃO]** | não existia; `[readonly]` acrescentado |
| erro | sim | fundo `danger-soft` + borda `danger` + rótulo danger + mensagem |
| carregando | **NÃO EXISTE** | |
| vazio | n/a (placeholder existe) | |
| selecionado | n/a | |

**Tamanhos:** único (padding 0.75/0.875rem, min-height 2.75rem).

**API:** `aria-invalid="true"` liga o visual de erro; `aria-describedby` aponta a mensagem; `disabled`, `readonly`, `placeholder`, `type` nativos.

**A11y:** `<label for>` real — a origem usa `<label>` sem `for` em alguns campos: **[CORRIGIDO no código exportado]**. Erro ligado por `aria-describedby` + `aria-invalid`: **[ADIÇÃO-A11Y]**. Alvo 2.75rem. Contraste do placeholder `--cds-text-3` sobre `surface-2` ≈ 3.4:1 — **abaixo de 4.5:1**, aceitável só porque placeholder não é conteúdo essencial; **não use placeholder como rótulo**.

**Ícones:** `search`, `chevron-down` (no select).

```html
<div class="cds-field">
  <label class="cds-field__label" for="nome">Nome da automação</label>
  <input class="cds-input" id="nome" type="text" placeholder="Ex.: Boas-vindas para novo membro">
</div>

<div class="cds-field">
  <label class="cds-field__label" for="busca">Buscar</label>
  <div class="cds-inputgroup">
    <span class="cds-inputgroup__icon"><svg class="cds-icon cds-icon--sm" data-lucide="search" aria-hidden="true"></svg></span>
    <input class="cds-input" id="busca" type="search" placeholder="Buscar por nome, email ou username…">
    <kbd class="cds-inputgroup__suffix">⌘K</kbd>
  </div>
</div>

<div class="cds-field cds-field--invalid">
  <label class="cds-field__label" for="email">E-mail</label>
  <input class="cds-input" id="email" type="email" value="email-invalido"
         aria-invalid="true" aria-describedby="email-err">
  <p class="cds-field__error" id="email-err">Informe um email válido.</p>
</div>
```

---

## 4. Badge / Tag — `.cds-badge`
**Estado: [IMPLEMENTADO]**

**Para que serve:** rotular estado ou categoria de um objeto. Não clicável.

**Quando NÃO usar:** como botão ou filtro clicável (não tem foco nem hover); para texto corrido; mais de 3 numa linha vira ruído.

**Anatomia:** pill + `[ícone opcional]` + rótulo caixa-alta com tracking.

**Variantes:** neutra (default, borda), `--primary`, `--success`, `--danger`, `--warning`, `--info`.

**Estados:** repouso **sim**. **Nenhum outro existe** — sem hover, foco, ativo, desabilitado, carregando, vazio, erro, selecionado, somente-leitura.

**Tamanhos:** único.

**API:** só classes.

**A11y:** sem role (é `<span>`). Se o badge for a única fonte de um estado, ele precisa ser lido: envolva com texto ou `.cds-sr-only` — **[ADIÇÃO-A11Y]**. Contraste: cor cheia sobre `*-soft` atende AA em ambos os temas nos valores atuais (não medido caso a caso — **não afirmo conformidade completa**).

**Ícones:** `video` (LIVE), `monitor` (ONLINE), `globe` (PÚBLICO).

```html
<span class="cds-badge cds-badge--primary">
  <svg class="cds-icon cds-icon--xs" data-lucide="video" aria-hidden="true"></svg>Live
</span>
<span class="cds-badge">Via aceleração</span>
<span class="cds-badge cds-badge--warning">Em breve</span>
<span class="cds-badge cds-badge--danger">Esgotado</span>
```

---

## 5. Nav item / Sidebar — `.cds-navitem`, `.cds-sidebar`
**Estado: [IMPLEMENTADO]**

**Para que serve:** navegação primária persistente do shell.

**Quando NÃO usar:** com mais de ~12 itens sem agrupamento; para ações (é navegação, não comando); em viewport estreito — **não há alternativa desenhada**.

**Anatomia:** sidebar = marca + grupos rotulados + itens + rodapé. Item = ícone 1.0625rem + rótulo; ativo ganha `box-shadow: inset 3px` na cor primária.

**Variantes:** item de navegação; grupo (`.cds-sidebar__group`).

**Estados:** repouso **sim**; hover **sim** (surface-2); ativo/atual **sim** (`aria-current="page"` ou `data-active`); focus-visible **[ADIÇÃO-A11Y]**; desabilitado, carregando, vazio, erro, selecionado-múltiplo, somente-leitura: **não existem**.

**Tamanhos:** único; min-height 2.75rem (**[ADIÇÃO]** — na origem era 0.5625rem de padding sem mínimo, ~2.3rem, abaixo de 44px).

**API:** `aria-current="page"` (preferido) ou `data-active="true"`.

**A11y:** envolver em `<nav aria-label="Principal">` — **[ADIÇÃO-A11Y]**. Na origem os itens são `<button>` que trocam estado, não links; no destino, se navegam, devem ser `<a>`. Estado ativo é comunicado por cor + barra — **e agora também por `aria-current`**.

**Ícones:** `layout-dashboard`, `palette`, `type`, `ruler`, `layers`, `shapes`, `mouse-pointer-click`, `text-cursor-input`, `badge-check`, `square-stack`, `gauge`, `menu`, `table`, `copy`, `bell-ring`, `line-chart`, `home`, `gallery-vertical-end`, `layout-grid`, `message-square`, `bookmark`, `sun`, `moon`.

```html
<nav class="cds-sidebar" aria-label="Principal">
  <div class="cds-sidebar__brand">cativa</div>
  <p class="cds-sidebar__group" id="grp-f">Fundações</p>
  <a class="cds-navitem" href="#cores" aria-current="page">
    <svg class="cds-icon" data-lucide="palette" aria-hidden="true"></svg><span>Cores</span>
  </a>
  <a class="cds-navitem" href="#tipografia">
    <svg class="cds-icon" data-lucide="type" aria-hidden="true"></svg><span>Tipografia</span>
  </a>
</nav>
```

---

## 6. Table (listagem) — `.cds-table`
**Estado: [IMPLEMENTADO]** — **com ressalva grave: não é `<table>`**

**Para que serve:** listar registros com colunas fixas.

**Quando NÃO usar:** para dados realmente tabulares que precisam de leitor de tela, ordenação ou exportação — a implementação atual é grid de `div` e **não é acessível como tabela**. Ver INCOERENCIAS.

**Anatomia:** contêiner + `__header` opcional (título + contador) + `__head` (rótulos caixa-alta) + N `__row`.

**Variantes:** nenhuma.

**Estados:** repouso **sim**; hover de linha **sim** (surface-2); **não existem**: linha selecionada, foco de linha, ordenação, zebra, densidade compacta, **estado vazio**, erro de carga, somente-leitura. Carregando tem primitivo (`.cds-skeleton`, item 33) mas **falta a composição de linha de tabela** — hoje é só o bloco genérico.

**Tamanhos:** único. Colunas via variável `--cds-table-cols`.

**API:** `--cds-table-cols` (CSS var, define `grid-template-columns`).

**A11y:** **[AUSENTE na origem]**. O código exportado abaixo usa `<table>` real com `<caption>`/`<th scope>` — **isto é uma reescrita semântica**, não a origem. Se quiser paridade literal com a origem, use as classes sobre `div` e assuma a perda.

**Ícones:** `star` (dentro do selo).

```html
<div class="cds-table">
  <div class="cds-card__header">
    <span class="cds-card__title">Usuários</span>
    <span class="cds-small">Página 1 de 410</span>
  </div>
  <div class="cds-table__head" role="row">
    <span>Usuário</span><span>E-mail</span><span>Selo</span><span>Cadastro</span>
  </div>
  <div class="cds-table__row">
    <div class="cds-table__cell cds-table__user">
      <span class="cds-avatar" aria-hidden="true">MT</span>
      <span class="cds-table__cell--strong">Mulher Ta On</span>
    </div>
    <div class="cds-table__cell">contato@mulhertaon.com</div>
    <div class="cds-table__cell">
      <span class="cds-seal cds-seal--sm"><svg class="cds-icon cds-icon--xs" data-lucide="star" aria-hidden="true"></svg><span class="cds-sr-only">Selo verificado</span></span>
    </div>
    <div class="cds-table__cell">15/07/2026</div>
  </div>
</div>
```

---

## 7. Metric card — `.cds-metric`
**Estado: [IMPLEMENTADO]**

**Para que serve:** mostrar um número do período atual contra o anterior, com a variação.

**Quando NÃO usar:** sem período de comparação (use `.cds-stat`); para valor que não é contável; **para qualquer dado que possa estar indisponível — ver seção F, o componente não suporta isso**.

**Anatomia:** cabeçalho (nome caixa-alta + ícone semântico) + rótulos de período + valor atual / valor anterior + faixa de delta.

**Variantes:** ícone `--primary|--success|--danger|--warning`; delta `--up|--down`.

**Estados:** repouso **sim**; **carregando** via composição com `.cds-skeleton` (item 33, ver exemplo abaixo). **NÃO EXISTEM**: vazio, erro, indisponível, zero tratado, hover, foco, selecionado, desabilitado, somente-leitura. Fora do repouso e do carregando, o componente **só sabe renderizar um número presente**.

**Tamanhos:** único.

**API:** classes + texto. Nenhuma prop.

**A11y:** o delta usa **seta + cor + texto** (↗ +1 (100%)), então não depende só de cor — bom. Falta `aria-label` unificando "7, contra 9 no período anterior, queda de 22%": **[AUSENTE]**.

**Ícones:** `user-round`, `graduation-cap`, `clock`, `trending-up`, `trending-down`.

```html
<article class="cds-metric">
  <header class="cds-metric__head">
    <span class="cds-metric__name">Matrículas únicas</span>
    <span class="cds-metric__icon cds-metric__icon--danger">
      <svg class="cds-icon cds-icon--sm" data-lucide="user-round" aria-hidden="true"></svg>
    </span>
  </header>
  <div class="cds-metric__periods"><span>Últimos 7 dias</span><span>Período anterior</span></div>
  <div class="cds-metric__values">
    <span class="cds-metric__value">7</span>
    <span class="cds-metric__value--prev">9</span>
  </div>
  <span class="cds-metric__delta cds-metric__delta--down">↘ -2 (-22%)</span>
</article>
```

**Estado `carregando`** (contrato: o rótulo permanece legível, só a caixa do número vira esqueleto):
```html
<article class="cds-metric">
  <header class="cds-metric__head">
    <span class="cds-metric__name">Matrículas únicas</span>
    <span class="cds-metric__icon cds-metric__icon--danger">
      <svg class="cds-icon cds-icon--sm" data-lucide="user-round" aria-hidden="true"></svg>
    </span>
  </header>
  <div class="cds-metric__periods"><span>Últimos 7 dias</span><span>Período anterior</span></div>
  <div class="cds-metric__values">
    <span class="cds-metric__value cds-skeleton" role="status" aria-label="Carregando"></span>
  </div>
</article>
```

---

## 8. Tabs — `.cds-tabs`
**Estado: [IMPLEMENTADO]**

**Para que serve:** alternar entre visões irmãs do mesmo objeto, sem trocar de página.

**Quando NÃO usar:** para etapas sequenciais (é wizard); com mais de ~5 abas; quando o conteúdo precisa de URL própria.

**Anatomia:** trilha com borda inferior + abas; ativa ganha sublinhado 2px na primária.

**Variantes:** nenhuma.

**Estados:** repouso **sim**; selecionada **sim**; hover **NÃO EXISTE**; focus-visible **[ADIÇÃO-A11Y]**; desabilitada, carregando, erro, vazio, somente-leitura: **não existem**.

**Tamanhos:** único.

**API:** `role="tablist"`/`role="tab"`/`aria-selected`/`aria-controls` — **[ADIÇÃO-A11Y]**, a origem usa `<button>` cru sem nenhum desses.

**A11y:** teclado esperado: ←/→ move entre abas, Home/End vão às pontas, Tab sai para o painel. **Esse comportamento NÃO está implementado em lugar nenhum — nem na origem, nem aqui.** É JS que o destino precisa escrever.

**Ícones:** nenhum.

```html
<div class="cds-tabs" role="tablist" aria-label="Seções">
  <button class="cds-tabs__tab" role="tab" id="t1" aria-selected="true" aria-controls="p1" type="button">Visão Geral</button>
  <button class="cds-tabs__tab" role="tab" id="t2" aria-selected="false" aria-controls="p2" type="button" tabindex="-1">Cursos</button>
</div>
<div id="p1" role="tabpanel" aria-labelledby="t1">…</div>
```

---

## 9. Modal — `.cds-scrim` + `.cds-modal`
**Estado: [IMPLEMENTADO]** (abre/fecha por clique, verificado)

**Para que serve:** confirmar ação destrutiva ou pedir decisão que bloqueia o fluxo.

**Quando NÃO usar:** para informação que cabe inline (use banner); empilhado sobre outro modal; para formulário longo.

**Anatomia:** scrim (fixed, blur, clique fecha) > modal (ícone semântico + botão fechar, título serif, corpo, rodapé com Cancelar + ação).

**Variantes:** ícone `--danger` (única existente).

**Estados:** aberto/fechado **sim**. **NÃO EXISTEM**: carregando (ação em andamento), erro dentro do modal, vazio, desabilitado, somente-leitura, tamanho alternativo.

**Tamanhos:** único, 27.5rem.

**API:** presença no DOM = aberto. Sem atributo de controle.

**A11y — o pior contrato do pacote:** a origem tem **[AUSENTE]** todos estes itens: `role="dialog"`, `aria-modal`, `aria-labelledby`, foco inicial, **focus trap**, fechar com **Escape**, restauração de foco ao fechar, `inert` no fundo. O código abaixo inclui os **atributos** ([ADIÇÃO-A11Y]) mas **o comportamento de teclado continua não implementado** — o destino precisa escrever.

**Ícones:** `trash-2`, `x`.

```html
<div class="cds-scrim" data-cds-dismiss>
  <div class="cds-modal" role="dialog" aria-modal="true" aria-labelledby="m-title">
    <div class="cds-modal__head">
      <span class="cds-modal__icon cds-modal__icon--danger">
        <svg class="cds-icon cds-icon--md" data-lucide="trash-2" aria-hidden="true"></svg>
      </span>
      <button class="cds-modal__close" type="button" aria-label="Fechar">
        <svg class="cds-icon cds-icon--md" data-lucide="x" aria-hidden="true"></svg>
      </button>
    </div>
    <h2 class="cds-modal__title" id="m-title">Excluir automação?</h2>
    <p class="cds-modal__body">Esta ação não pode ser desfeita. A automação e todo o histórico de disparos serão removidos permanentemente.</p>
    <div class="cds-modal__foot">
      <button class="cds-btn cds-btn--secondary" type="button">Cancelar</button>
      <button class="cds-btn cds-btn--danger-solid" type="button">Excluir</button>
    </div>
  </div>
</div>
```

---

## 10. Toast — `.cds-toast`
**Estado: [IMPLEMENTADO]** (dispara e some em 2.8s)

**Para que serve:** confirmar que uma ação assíncrona terminou.

**Quando NÃO usar:** para erro que exige decisão (use banner ou modal); para mensagem longa; empilhar vários.

**Anatomia:** ícone em quadrado soft + título + texto + fechar.

**Variantes:** **só existe a de sucesso.** Não há toast de erro, aviso ou info — o `__icon` está fixo em `success-soft`/`success`.

**Estados:** visível **sim**; auto-dismiss após 2.8s **sim**; hover-pausa **NÃO EXISTE**; foco **NÃO EXISTE**; fila/empilhamento **NÃO EXISTE**.

**Tamanhos:** único.

**API:** `.cds-toast--fixed` posiciona no canto inferior direito.

**A11y:** **[AUSENTE]** `role="status"`/`aria-live="polite"` na origem — incluído no código abaixo como [ADIÇÃO-A11Y]. O botão fechar existe visualmente mas **não tem handler na origem** (é decorativo). Auto-dismiss de 2.8s é curto para leitor de tela.

**Ícones:** `check`, `x`.

```html
<div class="cds-toast cds-toast--fixed" role="status" aria-live="polite">
  <span class="cds-toast__icon"><svg class="cds-icon cds-icon--sm" data-lucide="check" aria-hidden="true"></svg></span>
  <div>
    <p class="cds-toast__title">Planilha exportada</p>
    <p class="cds-toast__text">6.042 usuários · usuarios.csv</p>
  </div>
  <button class="cds-toast__close" type="button" aria-label="Fechar">
    <svg class="cds-icon cds-icon--sm" data-lucide="x" aria-hidden="true"></svg>
  </button>
</div>
```

---

## 11. Banner inline — `.cds-banner`
**Estado: [IMPLEMENTADO]**

**Para que serve:** mensagem persistente ligada a um contexto da página.

**Quando NÃO usar:** para confirmação efêmera (toast); no topo global (use `.cds-announce`); vários seguidos.

**Anatomia:** ícone semântico + título + texto. Sem botão fechar, sem ação.

**Variantes:** `--info`, `--success`, `--danger`, `--warning` (o `--warning` **não** existia na origem; as outras três sim — foi completado por simetria de token, declarado).

**Estados:** repouso **sim**. Dispensável/fechado **NÃO EXISTE**. Nenhum outro estado existe.

**Tamanhos:** único.

**API:** só classes.

**A11y:** para erro, adicionar `role="alert"`; para info, `role="status"` — **[ADIÇÃO-A11Y]**.

**Ícones:** `info`, `check-circle-2`, `alert-triangle`.

```html
<div class="cds-banner cds-banner--danger" role="alert">
  <svg class="cds-icon cds-icon--md cds-banner__icon" data-lucide="alert-triangle" aria-hidden="true"></svg>
  <div>
    <p class="cds-banner__title">Erro</p>
    <p class="cds-banner__text">Não foi possível conectar à integração. Tente novamente.</p>
  </div>
</div>
```

CONTINUA em COMPONENTS-02.md
