# C. Componentes — parte 2

> Mesmas convenções da parte 1. Biblioteca de ícones: **Lucide**.

---

## 12. Select — `.cds-select`
**Estado: [IMPLEMENTADO]**

**Para que serve:** escolher 1 entre poucas opções conhecidas.
**Quando NÃO usar:** com 2–3 opções curtas (use `.cds-segmented`); para busca em lista longa (não há combobox no pacote); para múltipla escolha (**não existe multi-select**).
**Anatomia:** `<select>` nativo + chevron absoluto decorativo.
**Variantes:** nenhuma.
**Estados:** repouso **sim**; foco **sim** (mesmo anel do input); desabilitado **[ADIÇÃO]**; erro **NÃO EXISTE** (não há `aria-invalid` estilizado para select); hover, carregando, vazio, selecionado-múltiplo, somente-leitura: **não existem**.
**Tamanhos:** único. **API:** nativos (`disabled`, `required`).
**A11y:** `<select>` nativo = teclado e leitor de tela funcionam de graça. Chevron é `aria-hidden`. Cor do texto é `--cds-text-2` mesmo com valor escolhido — **valor selecionado fica mais apagado que deveria**, declarado como defeito.
**Ícones:** `chevron-down`.

```html
<div class="cds-field">
  <label class="cds-field__label" for="evento">Evento</label>
  <div class="cds-select-wrap">
    <select class="cds-select" id="evento">
      <option>Selecione um evento…</option>
      <option>Novo membro</option>
    </select>
    <span class="cds-select-wrap__chevron"><svg class="cds-icon cds-icon--sm" data-lucide="chevron-down" aria-hidden="true"></svg></span>
  </div>
</div>
```

---

## 13. Textarea — `.cds-textarea`
**Estado: [IMPLEMENTADO]**
**Para que serve:** texto livre de múltiplas linhas. **Quando NÃO usar:** para uma linha; para texto rico (não há editor).
**Anatomia:** rótulo + `<textarea>` redimensionável na vertical.
**Variantes:** nenhuma. **Estados:** repouso, foco (mesmo anel). Desabilitado **[ADIÇÃO]**. Erro, contador de caracteres, carregando, somente-leitura: **não existem**.
**Tamanhos:** `rows` define a altura; único estilo. **API:** nativos.
**A11y:** rótulo real; `resize: vertical` preserva o layout.
**Ícones:** nenhum.

```html
<div class="cds-field">
  <label class="cds-field__label" for="desc">Descrição</label>
  <textarea class="cds-textarea" id="desc" rows="3" placeholder="Escreva aqui…"></textarea>
</div>
```

---

## 14. Checkbox — `.cds-check`
**Estado: [IMPLEMENTADO]** — **ressalva: na origem NÃO é um input**, é um `<span>` pintado. O código abaixo é reescrita com `<input type="checkbox">` real.
**Para que serve:** ligar/desligar uma opção independente, geralmente em lista.
**Quando NÃO usar:** para uma configuração que aplica imediatamente (use switch); para escolha exclusiva (radio — **não existe radio no pacote**).
**Anatomia:** input visualmente oculto + caixa 1.25rem + rótulo.
**Variantes:** nenhuma.
**Estados:** desmarcado **sim**; marcado **sim** (primária + `check`); focus-visible **[ADIÇÃO-A11Y]**; desabilitado **[ADIÇÃO]**; **indeterminado NÃO EXISTE**; erro, carregando, somente-leitura: **não existem**.
**Tamanhos:** único; área clicável 2.75rem via `min-height`.
**API:** nativos (`checked`, `disabled`).
**A11y:** input real = Espaço alterna, leitor anuncia. Na origem, **nada disso funcionava** (era decorativo).
**Ícones:** `check`.

```html
<label class="cds-check">
  <input type="checkbox" checked>
  <span class="cds-check__box" aria-hidden="true"><svg class="cds-icon cds-icon--xs" data-lucide="check"></svg></span>
  Notificar por email
</label>
```

---

## 15. Switch — `.cds-switch`
**Estado: [IMPLEMENTADO]** — mesma ressalva: na origem é `div` decorativa; abaixo é input real.
**Para que serve:** ligar/desligar algo que aplica na hora.
**Quando NÃO usar:** dentro de formulário que só salva no submit (use checkbox); para ação destrutiva sem confirmação.
**Anatomia:** input oculto + trilho 2.5×1.375rem + polegar.
**Variantes:** nenhuma.
**Estados:** off **sim**; on **sim** (primária + polegar branco); focus-visible **[ADIÇÃO-A11Y]**; desabilitado **NÃO EXISTE**; carregando/pendente **NÃO EXISTE** (não há estado "salvando"); erro **NÃO EXISTE**.
**Tamanhos:** único. **API:** nativos.
**A11y:** `role="switch"` é opcional com `<input type="checkbox">`; o rótulo precisa dizer o que liga.
**Ícones:** nenhum.

```html
<label class="cds-switch">
  <input type="checkbox" role="switch" checked>
  <span class="cds-switch__track" aria-hidden="true"><span class="cds-switch__thumb"></span></span>
  Automação ativa
</label>
```

---

## 16. Segmented control — `.cds-segmented`
**Estado: [IMPLEMENTADO]** (troca de seleção funciona)
**Para que serve:** alternar entre 2–3 modos curtos e mutuamente exclusivos.
**Quando NÃO usar:** com rótulos longos; com mais de 3 opções (vire select); para ações (não é grupo de botões).
**Anatomia:** trilho surface-2 + itens; selecionado sobe para surface-3.
**Variantes:** nenhuma.
**Estados:** repouso, selecionado **sim**; hover **NÃO EXISTE**; focus-visible **[ADIÇÃO-A11Y]**; desabilitado, carregando, erro: **não existem**.
**Tamanhos:** único. **API:** `aria-selected` ou `data-selected`.
**A11y:** deve ser `role="radiogroup"`+`role="radio"` ou tablist; **a origem não tem nenhum role** e mistura um botão de ação ("Salvar") dentro do mesmo trilho — ver INCOERENCIAS.
**Ícones:** nenhum (usa "●" textual).

```html
<div class="cds-segmented" role="radiogroup" aria-label="Status">
  <button class="cds-segmented__item" type="button" role="radio" aria-checked="false">Inativa</button>
  <button class="cds-segmented__item" type="button" role="radio" aria-checked="true" data-selected="true">Ativa</button>
</div>
```

---

## 17. Topbar — `.cds-topbar`
**Estado: [IMPLEMENTADO]**
**Para que serve:** identidade + navegação de nível 1 + ações globais.
**Quando NÃO usar:** junto de sidebar com os mesmos destinos (duplica navegação).
**Anatomia:** marca + links + ações (busca, notificações). Variante `--blur` fica sticky com `backdrop-filter`.
**Variantes:** `--blur`.
**Estados:** link em repouso e `aria-current="page"` (sublinhado primário) **sim**; hover **NÃO EXISTE**; foco **[ADIÇÃO-A11Y]**.
**Tamanhos:** único. **API:** `aria-current`.
**A11y:** envolver em `<header>`+`<nav aria-label>`; botões de ícone precisam de `aria-label` (**não têm na origem**).
**Ícones:** `search`, `bell`, `chevron-right`.

```html
<header class="cds-topbar cds-topbar--blur">
  <span class="cds-topbar__brand">cativa</span>
  <nav class="cds-topbar__nav" aria-label="Principal">
    <a class="cds-topbar__link" href="#" aria-current="page">Comunidade</a>
    <a class="cds-topbar__link" href="#">Cursos</a>
  </nav>
  <div class="cds-topbar__actions">
    <button class="cds-topbar__iconbtn" type="button" aria-label="Buscar">
      <svg class="cds-icon" data-lucide="search" aria-hidden="true"></svg>
    </button>
  </div>
</header>
```

---

## 18. Breadcrumb — `.cds-breadcrumb`
**Estado: [IMPLEMENTADO]**
**Para que serve:** mostrar onde você está numa hierarquia e voltar.
**Quando NÃO usar:** com hierarquia de 1 nível; como substituto de navegação.
**Anatomia:** itens separados por `chevron-right`; último em destaque.
**Variantes/estados:** só repouso. Hover, foco, truncamento: **não existem**.
**Tamanhos:** único. **API:** `aria-current="page"` no último.
**A11y:** `<nav aria-label="Trilha">` + `<ol>` — **[ADIÇÃO-A11Y]**, origem usa spans soltos.
**Ícones:** `chevron-right`.

```html
<nav class="cds-breadcrumb" aria-label="Trilha">
  <a href="#">Admin</a>
  <svg class="cds-icon cds-icon--sm" data-lucide="chevron-right" aria-hidden="true"></svg>
  <a href="#">Usuários</a>
  <svg class="cds-icon cds-icon--sm" data-lucide="chevron-right" aria-hidden="true"></svg>
  <span class="cds-breadcrumb__current" aria-current="page">Detalhes</span>
</nav>
```

---

## 19. Pagination — `.cds-pagination`
**Estado: [IMPLEMENTADO]**
**Para que serve:** avançar/voltar em listagem paginada.
**Quando NÃO usar:** com poucos itens; quando rolagem infinita já existe.
**Anatomia:** botão Anterior + status "Página X de Y" + botão Próxima. **Não há números de página.**
**Variantes:** nenhuma.
**Estados:** o "Anterior" aparece visualmente apagado (text-3) mas **não está `disabled`** — é aparência sem semântica. Declarado como defeito. Carregando, erro: **não existem**.
**Tamanhos:** único. **API:** `disabled` nos botões (recomendado, não usado na origem).
**A11y:** `<nav aria-label="Paginação">`; o status deve ser `aria-live="polite"` — **[ADIÇÃO-A11Y]**.
**Ícones:** `chevron-left`, `chevron-right`.

```html
<nav class="cds-pagination" aria-label="Paginação">
  <button class="cds-btn cds-btn--secondary cds-btn--sm" type="button" disabled>
    <svg class="cds-icon cds-icon--sm" data-lucide="chevron-left" aria-hidden="true"></svg>Anterior
  </button>
  <span class="cds-pagination__status" aria-live="polite">Página 1 de 410</span>
  <button class="cds-btn cds-btn--secondary cds-btn--sm" type="button">
    Próxima<svg class="cds-icon cds-icon--sm" data-lucide="chevron-right" aria-hidden="true"></svg>
  </button>
</nav>
```

---

## 20. Content card (curso/evento) — `.cds-contentcard`
**Estado: [IMPLEMENTADO]**
**Para que serve:** representar um curso, evento ou aula numa vitrine.
**Quando NÃO usar:** sem imagem de capa real (o placeholder listrado é de referência, não de produção); para item de lista densa.
**Anatomia:** capa 16:9 com badges sobrepostos + corpo (rótulo caixa-alta, título serif, meta com ícone) + opcional `.cds-progress`.
**Variantes:** capa listrada (placeholder), capa com gradiente + botão play, card de progresso.
**Estados:** repouso **sim**. **NÃO EXISTEM**: hover, foco, carregando/skeleton, indisponível, bloqueado/cadeado, concluído.
**Tamanhos:** único (largura da grade).
**API:** só classes.
**A11y:** o card inteiro não é link; o título deveria ser o alvo — **não resolvido**. Capa é decorativa. Badges sobre imagem: contraste garantido pelo scrim, não medido.
**Ícones:** `clock`, `play`.

```html
<article class="cds-contentcard">
  <div class="cds-contentcard__cover">
    <span class="cds-cover-badge">Live</span>
    <span class="cds-cover-badge">Online</span>
  </div>
  <div class="cds-contentcard__body">
    <p class="cds-label">Via aceleração</p>
    <h3 class="cds-contentcard__title"><a href="#">Mapeie a jornada do seu cliente</a></h3>
    <p class="cds-contentcard__meta">
      <svg class="cds-icon cds-icon--sm" data-lucide="clock" aria-hidden="true"></svg>1H · Online
    </p>
  </div>
</article>
```

---

## 21. Stat — `.cds-stat`
**Estado: [IMPLEMENTADO]**
**Para que serve:** número absoluto com ícone, sem comparação.
**Quando NÃO usar:** quando há período anterior (use `.cds-metric`).
**Anatomia:** ícone 2.75rem soft + rótulo + valor + nota opcional.
**Variantes:** nenhuma (ícone sempre primário).
**Estados:** repouso **sim**; todos os outros **não existem** — inclusive carregando e indisponível.
**Tamanhos:** único. **API:** só classes.
**A11y:** rótulo e valor são texto; sem role.
**Ícones:** `book-open`, `play`, `layers`.

```html
<div class="cds-stat">
  <span class="cds-stat__icon"><svg class="cds-icon cds-icon--lg" data-lucide="book-open" aria-hidden="true"></svg></span>
  <div>
    <p class="cds-stat__label">Cursos</p>
    <p class="cds-stat__value">15 <span class="cds-stat__note">+11 rascunhos</span></p>
  </div>
</div>
```

---

## 21b. Action card — `.cds-action-card`
**Estado: [IMPLEMENTADO]** *(nasce na v1.6.0 — fecha a GAP-DS-038)*

**Para que serve:** oferecer **uma** ação em largura total dentro de um card — o "faça isto agora" de uma home ou de um painel. Nasce porque o pacote não tinha veículo para isso: quem precisava escrevia `width:100%` à mão, e o `lint-tokens` **não pega** `width` (só cor, fonte, raio, sombra e espaço).

**Quando NÃO usar:**
- Quando a ação **não** é a principal daquela área — aí é `.cds-btn` normal dentro de `.cds-card`.
- Como item de lista clicável — não existe estado de hover/foco no card, **de propósito** (ver abaixo).
- Para exibir número sem ação — use `.cds-stat` (é a mesma forma, sem a ação).

**Anatomia:** `__head` (ícone opcional + `__title` + `__note`) + o botão. O ícone **reusa `.cds-stat__icon`** — não há classe nova para ele.

**Variantes:** nenhuma. A ação de dentro escolhe a sua (`.cds-btn--primary.cds-btn--block` é o caso normal).

**Estados:** repouso **sim**. **Nenhum outro existe** — sem hover, foco, ativo, desabilitado, carregando, vazio, erro, selecionado.

> ⛔ **NÃO é um `.cds-btn` gigante, e a diferença não é estética.** O **card** não é clicável; o **botão dentro dele** é. Card inteiro clicável quebra abrir-em-nova-aba, engole o texto secundário na etiqueta acessível e força o leitor de tela a anunciar o parágrafo inteiro como nome do controle. Por isso o card **não tem** `:hover` nem `:focus-visible`: se ele os tivesse, prometeria uma interação que não entrega.

**Tamanhos:** único (largura do container).

**API:** só classes.

**A11y:** o card é um contêiner sem role. O nome acessível da ação é o **rótulo do botão**, e ele precisa fazer sentido sozinho ("Estudar 12 cartas", não "Ir"). Foco: só o botão entra na ordem de tabulação — **é o comportamento pretendido**. Contraste: `--cds-text` sobre `--cds-surface` e `--cds-text-2` sobre `--cds-surface` passam AA nos dois temas *(medido: 16.75:1 / 7.18:1 no escuro; 17.72:1 / 7.73:1 no claro)*. ⚠️ O **botão** dentro herda o contraste da variante escolhida — e `--primary` está no **passivo declarado** (`scripts/contrast-allowlist.json`).

**Ícones:** `layers`, `play`, `book-open`, `zap`.

```html
<div class="cds-action-card">
  <div class="cds-action-card__head">
    <span class="cds-stat__icon"><svg class="cds-icon cds-icon--lg" data-lucide="layers" aria-hidden="true"></svg></span>
    <div>
      <p class="cds-action-card__title">Revisão de hoje</p>
      <p class="cds-action-card__note">12 cartas devidas</p>
    </div>
  </div>
  <button type="button" class="cds-btn cds-btn--primary cds-btn--block">Estudar 12 cartas</button>
</div>
```

---

## 22. Chip de variação — `.cds-chip`
**Estado: [IMPLEMENTADO]**
**Para que serve:** mostrar variação positiva/negativa ao lado de um número.
**Quando NÃO usar:** para valor absoluto; para estado (use badge); **para variação zero — não há variante neutra**.
**Anatomia:** ícone de tendência + texto "+1 (100%)".
**Variantes:** `--up`, `--down`. **Não existe `--neutral`.**
**Estados:** só repouso.
**Tamanhos:** único. **API:** só classes.
**A11y:** ícone + sinal no texto, não depende só de cor.
**Ícones:** `trending-up`, `trending-down`.

```html
<span class="cds-chip cds-chip--up">
  <svg class="cds-icon cds-icon--sm" data-lucide="trending-up" aria-hidden="true"></svg>+1 (100%)
</span>
```

---

## 23. Seal (selo hexagonal) — `.cds-seal`
**Estado: [IMPLEMENTADO]**
**Para que serve:** marcar distinção de um perfil (verificado, premium).
**Quando NÃO usar:** para status temporário (use badge/status dot); em quantidade.
**Anatomia:** hexágono por `clip-path` + ícone centralizado.
**Variantes:** primária (default), `--gold`, `--green`, `--sm`.
**Estados:** só repouso.
**Tamanhos:** 1.875rem e `--sm` 1.375rem.
**API:** só classes.
**A11y:** puramente visual — **exige `.cds-sr-only` dizendo o que o selo significa**, senão a informação some para leitor de tela.
**Ícones:** `star`, `crown`, `shield-check`.

```html
<span class="cds-seal cds-seal--gold">
  <svg class="cds-icon cds-icon--xs" data-lucide="crown" aria-hidden="true"></svg>
  <span class="cds-sr-only">Membro premium</span>
</span>
```

---

## 24. Status dot / Count / Avatar / Points
**Estado: [IMPLEMENTADO]** (os quatro)

- **`.cds-status`** — bolinha + rótulo ("Online"/"Offline"). Variantes `--online`, `--offline`. Só repouso. A cor **acompanha texto**, então não depende só de cor. Sem ícone.
- **`.cds-count`** — pill numérico na primária. Só repouso. Precisa de contexto textual (`.cds-sr-only` "notificações não lidas") — **ausente na origem**.
- **`.cds-iconbtn-dot`** — ícone com ponto vermelho de não-lido. Ícone `bell`. O ponto é `::after`, invisível para leitor: **[AUSENTE]**.
- **`.cds-avatar`** — círculo com iniciais. Não há avatar com imagem, nem grupo empilhado, nem tamanho grande. Iniciais devem ser `aria-hidden` com o nome ao lado.
- **`.cds-points`** — pill com `coins` + valor + unidade. Só repouso.

```html
<span class="cds-status cds-status--online"><span class="cds-status__dot" aria-hidden="true"></span>Online</span>
<span class="cds-count">12<span class="cds-sr-only"> notificações não lidas</span></span>
<span class="cds-avatar" aria-hidden="true">RM</span>
<span class="cds-points"><svg class="cds-icon cds-icon--sm" data-lucide="coins" aria-hidden="true"></svg>5.880 <span class="cds-points__unit">pontos</span></span>
```

---

## 25. Progress bar — `.cds-progress`
**Estado: [IMPLEMENTADO]**
**Para que serve:** progresso determinado (percentual conhecido).
**Quando NÃO usar:** para espera indeterminada (**não existe barra indeterminada**).
**Anatomia:** trilho + preenchimento; largura via style inline na origem → no destino, use a variável `--cds-bar-h`/largura por classe utilitária do próprio destino (**o CSP proíbe o inline; ver INCOERENCIAS #7**).
**Variantes:** default (primária), `__fill--warning`, `--lg`.
**Estados:** só repouso. Sem indeterminado, erro, pausado, concluído.
**Tamanhos:** 0.3125rem e `--lg` 0.5rem.
**API:** `role="progressbar"` + `aria-valuenow/min/max` — **[ADIÇÃO-A11Y]**.
**Ícones:** nenhum.

```html
<div class="cds-progress" role="progressbar" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100" aria-label="Progresso do curso">
  <div class="cds-progress__fill cds-progress__fill--warning"></div>
</div>
```

---

## 26. Ring / Donut — `.cds-ring`
**Estado: [IMPLEMENTADO]** (via `conic-gradient`)
**Para que serve:** um percentual único em destaque.
**Quando NÃO usar:** para comparar séries; com mais de um segmento (**só suporta um**).
**Anatomia:** disco com `conic-gradient` + furo central com o número.
**Variantes:** nenhuma. **Estados:** só repouso.
**Tamanhos:** 7.5rem fixo.
**API:** `--cds-ring-pct` (CSS var, ex. `68%`). **A11y:** número visível no centro; adicione `role="img" aria-label`.
**Ícones:** nenhum.

```html
<div class="cds-ring" style-forbidden="use classe utilitária do destino p/ --cds-ring-pct" role="img" aria-label="68 por cento de conclusão">
  <div class="cds-ring__hole">68%</div>
</div>
```
> Nota CSP: a origem passa a porcentagem por `style` inline. No destino, defina `--cds-ring-pct` numa classe utilitária estática (ex.: `.cds-ring--68`) ou via folha gerada no servidor. **Não há solução pronta no pacote.**

---

## 27. Bar chart — `.cds-bars`
**Estado: [IMPLEMENTADO]** (barras em CSS, não SVG)
**Para que serve:** comparar poucas categorias.
**Quando NÃO usar:** série temporal longa; valores negativos (**não suporta**); mais de ~8 barras.
**Anatomia:** colunas flex com barra + rótulo. Altura por `--cds-bar-h`.
**Variantes:** nenhuma. **Estados:** só repouso. Sem eixo, grade, tooltip, valor no topo, vazio.
**Tamanhos:** altura fixa 8.75rem.
**API:** `--cds-bar-h` por coluna — **mesmo problema de CSP do ring**.
**A11y:** **[AUSENTE]** — não há tabela equivalente nem rótulo de valor; um leitor de tela lê só os rótulos do eixo. Forneça `<table class="cds-sr-only">` com os dados.
**Ícones:** nenhum.

---

## 28. Area chart
**Estado: [IMPLEMENTADO] — porém é SVG DESENHADO À MÃO**
Viola a restrição 4 do destino. O `<path>` com curvas foi escrito manualmente, não gerado de dados. **Não exporto como componente reutilizável** — não é. Ver INCOERENCIAS #2. Se o destino precisa de gráfico de área, ele precisa de uma biblioteca de charts; o pacote **não tem uma**.

---

## 29. Tooltip — `.cds-tooltip`
**Estado: [ESPECIFICADO]** — existe como aparência estática na página; **não há comportamento**: não abre no hover, não abre no foco, não posiciona, não tem seta, não fecha com Escape.
**Para que serve:** rótulo curto de um controle de ícone.
**Quando NÃO usar:** para informação essencial; em touch (não há equivalente).
**Anatomia:** caixa surface-3 com borda e sombra raised.
**Variantes/estados:** nenhum além do visual em repouso.
**API/A11y:** deveria usar `aria-describedby`; **nada implementado**.
**Ícones:** nenhum próprio.

---

## 30. Popover — `.cds-popover`
**Estado: [ESPECIFICADO]** — aparência estática; **não abre, não ancora, não fecha**. O "x" é decorativo.
**Para que serve:** painel contextual curto com ações (o caso da origem é um assistente).
**Quando NÃO usar:** para conteúdo longo; como menu (não há menu no pacote).
**Anatomia:** cabeçalho (eyebrow + fechar) + texto + ações.
**Estados:** só o visual aberto. Sem foco, sem Escape, sem posicionamento.
**Ícones:** `x`, `settings-2`, `plus`.

---

## 31. Announcement bar — `.cds-announce`
**Estado: [IMPLEMENTADO]** (visual)
**Para que serve:** aviso global no topo de uma superfície.
**Quando NÃO usar:** para erro de sistema (use banner danger); permanentemente.
**Anatomia:** tag "AVISO" + texto + link de ação à direita.
**Variantes:** só a de aviso (warning). **Estados:** só repouso; **não é dispensável** (sem botão fechar, sem persistência).
**A11y:** o link tem texto próprio; a barra deveria ser `role="region" aria-label` — **[ADIÇÃO-A11Y]**.
**Ícones:** `megaphone`.

```html
<div class="cds-announce" role="region" aria-label="Aviso">
  <span class="cds-announce__tag">
    <svg class="cds-icon cds-icon--xs" data-lucide="megaphone" aria-hidden="true"></svg>Aviso
  </span>
  <span class="cds-announce__text">Inscrições abertas para beta testers da Cativa v2</span>
  <a class="cds-announce__action" href="#">Ativar →</a>
</div>
```

---

## 32. Ranking list
**Estado: [IMPLEMENTADO]** — não tem classe própria no CSS exportado; é composição de `.cds-card` + linhas com posição + `.cds-avatar` + nome + pontos.
**Quando NÃO usar:** para listagem geral (use table).
**Estados:** só repouso. Sem "você está aqui", sem empate, sem vazio.
**Ícones:** `trophy`.

---

## 33. Skeleton — `.cds-skeleton`
**Estado: [IMPLEMENTADO]** — v1.3.0, GAP-DS-027.

**Para que serve:** o veículo do estado `carregando` do contrato de estado de dado (`components.md` §"Contrato de estado de dado") — um bloco animado (`surface-2` → `surface-3`, shimmer) que ocupa o lugar de um valor ainda não chegado, **na caixa do dado**, com o rótulo ao redor já legível.

**Quando NÃO usar:** para carregamento de página/tela inteira (**jamais** — o contrato proíbe; use o estado `indisponivel` se a fonte demorar além do razoável) nem como substituto de `.cds-btn[data-loading="true"]` (o spinner de botão já existe e é de escopo diferente).

**Anatomia:** bloco (`div`/`span`) com fundo + shimmer via `::after`; variantes de forma (`--text`, `--circle`) e a composição `.cds-metric__value.cds-skeleton` (caixa do número da Métrica).

**Variantes:** `--text` (altura de linha, `0.875em`, empilhável), `--circle` (avatar/ícone), composição direta com `.cds-metric__value` (dimensão da caixa do número, `--cds-fs-h2`).

**Estados:** só o de carregamento em si — não tem hover/foco (não é interativo). Respeita `prefers-reduced-motion` (shimmer desliga, fica só o bloco estático).

**Tamanhos:** dimensão vem do contexto (largura do bloco/linha) ou da composição (`.cds-metric__value`); sem tamanhos nomeados próprios.

**API:** classes. Nenhuma prop.

**A11y:** o bloco não tem texto — marcar com `role="status"` + `aria-label` descritivo (ver exemplo no item 7, Metric card) para que leitor de tela anuncie "carregando" em vez de ler um espaço vazio.

**Ícones:** nenhum.

```html
<!-- linha de texto -->
<span class="cds-skeleton cds-skeleton--text" role="status" aria-label="Carregando"></span>
<span class="cds-skeleton cds-skeleton--text" role="status" aria-label="Carregando"></span>

<!-- avatar (herda o formato e o tamanho de .cds-avatar, já é radius-full) -->
<span class="cds-avatar cds-skeleton" role="status" aria-label="Carregando"></span>
```

`--circle` existe para compor com um contêiner que já dá largura/altura (ex.: `.cds-avatar`, `.cds-metric__icon`) sem depender de `style=""` — a CSP do pacote não permite inline (GAP-DS-016).

Composição na Métrica: ver item 7 (Metric card), estado `carregando`.

---

# Componentes que aparecem só como NOME

Itens citados no briefing ou no inventário do projeto que **não têm código nem spec**. Estado: **[SÓ NOME]**.

| Nome | Onde apareceu |
|---|---|
| Drawer / bottom sheet | citado como "modais, drawers e overlays" na priorização |
| Dropdown menu | citado; a elevação "raised · dropdown" existe, o componente não |
| Densidade compacta | citada no briefing ("prever multi uso") |
| Calendário / cronograma | citado como tipo de app embedado |
| Quiz / jogo | citado como tipo de app embedado |
| Radio button | implícito em formulários; nunca feito |
| Multi-select / combobox | nunca feito |
| Empty state | citado na 1ª rodada de perguntas; **nunca feito** |
| Breadcrumb truncado, Stepper, Accordion, Slider, Date picker, File upload, Rich text | nunca citados nem feitos — listados aqui só para deixar explícito que **não existem** |
