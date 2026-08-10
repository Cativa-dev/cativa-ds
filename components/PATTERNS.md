# B. Padrões de layout

> Estado global desta seção: o projeto de origem é **uma página única** (o
> "storybook" do DS). Portanto **shell de app** e **dashboard** existem
> renderizados; **listagem, detalhe/leitura e formulário** existem apenas
> como blocos dentro dessa página, nunca como tela completa. Está marcado
> item a item. Nada foi inventado.

## Grade
**[IMPLEMENTADO]** — CSS Grid com `gap`, sem sistema de colunas nomeadas
(não há grid de 12 colunas). Os agrupamentos usados na origem:
- `repeat(3, 1fr)` — cards de métrica, cards de conteúdo, halos
- `repeat(4, 1fr)` — números-resumo
- `repeat(2, 1fr)` — pares de painel
- `repeat(auto-fill, minmax(10.625rem, 1fr))` — swatches de cor
- `repeat(auto-fill, minmax(7rem, 1fr))` — grade de ícones
Gap padrão: `--cds-space-md` (1rem); em seções maiores `--cds-space-lg`.

## Larguras de container
**[IMPLEMENTADO]**
- Conteúdo principal: `--cds-content-max` = **70rem** (1120px), `padding: 2rem`.
- Sidebar: `--cds-sidebar-w` = **16.5rem** (264px), fixa, não colapsável.
- Modal: **27.5rem** (440px), `max-width: 100%`.
- Popover: **16.25rem** (260px).

## Breakpoints
**[ADIÇÃO — não existe na origem]** O projeto de origem **não tem nenhuma
media query**. Foi desenhado só para desktop largo. As duas quebras no CSS
exportado são mínimas e não testadas:
| Nome | Valor | O que faz |
|---|---|---|
| `md` | `max-width: 63.9375rem` (<1024px) | grades de 3/4 colunas viram 2 |
| `sm` | `max-width: 47.9375rem` (<768px) | sidebar some, tudo vira 1 coluna, padding cai para 1rem |

Não existe breakpoint `lg`/`xl`, não existe container query, não existe
layout mobile desenhado.

## Densidades
**NÃO EXISTE variante compacta.** Há uma única densidade. A questão de
densidade multi-uso foi levantada no briefing mas nunca virou código nem
spec — estado **[SÓ NOME]**.

## Padrão: shell de app (sidebar + conteúdo)
**[IMPLEMENTADO]** — `.cds-shell` > `.cds-sidebar` + `.cds-main` > `.cds-topbar` + `.cds-content`.
- **Marca:** vive no topo da sidebar (`.cds-sidebar__brand`) — marca gráfica + wordmark "cativa". No padrão de topbar isolado, a marca vive à esquerda da topbar.
- **Quem seta o tema:** o **host**, escrevendo `data-theme="dark|light"` num ancestral. Na origem, quem alterna é um botão dentro do rodapé da sidebar que troca estado do componente. No destino, o embed **não deve** ser dono do tema — ele herda.
- **Onde persiste a preferência:** **em lugar nenhum.** A origem guarda o tema em estado de componente e **perde no reload** (confirmado nesta sessão: recarregar volta para escuro). Não há localStorage, cookie nem query param. Estado: lacuna real.
- **Navegação em viewport estreito:** **não existe.** Abaixo de 48rem a sidebar simplesmente é ocultada pelo CSS exportado e **não há substituto** — sem drawer, sem hambúrguer, sem bottom bar. É a maior lacuna de layout do pacote.

## Padrão: listagem
**[IMPLEMENTADO como bloco]** — `.cds-table` (grid de divs) com cabeçalho
caixa-alta, linha com avatar + nome + email + selo + data, hover na linha,
e `.cds-pagination` com "Anterior / Página X de Y / Próxima".
Não existe: ordenação, filtro aplicado, seleção múltipla, ação em massa,
estado vazio, skeleton.

## Padrão: detalhe / leitura
**[SÓ NOME]** — não existe tela de detalhe no projeto. O que existe e pode
servir de base é o card de conteúdo (`.cds-contentcard`) e a tipografia
editorial (`.cds-display`/`.cds-h1` em serif). Nunca foi montado.

## Padrão: formulário
**[IMPLEMENTADO como bloco]** — dois painéis lado a lado com `.cds-field`
empilhados (`gap: 1.25rem` na origem; use `.cds-stack`). Rótulo caixa-alta
acima do controle, mensagem de erro abaixo. Não existe: barra de ações
fixa, agrupamento em fieldset, validação em submit, layout de duas colunas
por campo, estado de salvamento.

## Padrão: dashboard
**[IMPLEMENTADO]** — linha de 3 cards de métrica com comparação de período
+ linha de 3 `.cds-stat` + gráfico de área em largura total + par
barras/anel. É o padrão mais completo do pacote.

## Padrão: overlay / modal
**[IMPLEMENTADO]** — `.cds-scrim` (fixed, blur, clique no fundo fecha) >
`.cds-modal` centralizado, com ícone semântico, título serif, corpo e
rodapé de ações alinhado à direita (Cancelar + ação destrutiva).
Não existe: drawer lateral, bottom sheet, foco preso (focus trap),
fechar com Escape, restauração de foco. Ver contrato de a11y do modal.
