# D. Regras de escrita e conteúdo

> **Aviso de estado.** O projeto **não tem** um guia de conteúdo escrito.
> O que segue foi **extraído por observação do texto realmente usado** na
> interface de origem — é descritivo, não normativo, e está marcado como
> **[OBSERVADO]**. Onde não há evidência suficiente, está escrito
> "não há evidência". Nada foi inventado para preencher.

## Idioma
**[OBSERVADO]** Português do Brasil, sem estrangeirismo desnecessário.
Exceções mantidas em inglês porque são termos de produto: "Live", "Online",
"Ghost" (nome de variante), "Design System", "Data viz".

## Capitalização
**[OBSERVADO]** — há **duas convenções convivendo**, o que é uma inconsistência real:
- **Sentence case** em títulos, rótulos de campo e botões: "Nome da automação", "Excluir automação?", "Buscar", "Cancelar", "Excluir".
- **CAIXA-ALTA com tracking** em: rótulos de campo (`.cds-field__label`), rótulos de seção de card, badges/tags, cabeçalho de tabela, rótulos de período de métrica. Ex.: "MATRÍCULAS ÚNICAS", "ÚLTIMOS 7 DIAS", "VIA ACELERAÇÃO", "USUÁRIO".
- Títulos de navegação em Title Case parcial: "Visão Geral", "Página inicial", "Painel administrativo", "Posts Salvos" (note "Posts Salvos" com S maiúsculo em ambos — inconsistente com "Página inicial").

**Regra derivável:** caixa-alta é reservada a rótulos curtos de metadado
(≤3 palavras). Frase e título usam sentence case. **A origem não segue isso
com rigor** — ver INCOERENCIAS #9.

## Tom
**[OBSERVADO]** Direto, segunda pessoa implícita, sem exclamação — exceto no
popover do assistente, que é o único componente com voz calorosa:
"Ricardo! Pronto pra mais uma sessão produtiva?" (inclui contração informal
"pra"). Fora dele, o tom é neutro e operacional.

## Como se escreve ERRO
**[OBSERVADO]** — duas amostras existem:
- Campo: **"Informe um email válido."** → imperativo, curto, com ponto final, diz o que fazer.
- Banner: título **"Erro"** + corpo **"Não foi possível conectar à integração. Tente novamente."** → constata a falha em voz impessoal e oferece a próxima ação.

Padrão derivável: *o que aconteceu* + *o que fazer*. Sem culpa, sem código
de erro, sem "Ops".

## Como se escreve CONFIRMAÇÃO
**[OBSERVADO]** — duas amostras:
- Banner: **"Sucesso"** + **"Automação criada e ativada com êxito."**
- Toast: **"Planilha exportada"** + **"6.042 usuários · usuarios.csv"** (o toast confirma com **dados concretos** do que foi feito, separados por `·`).
- Toast genérico: **"Tudo certo!"** + **"Ação concluída com sucesso."** (única exclamação fora do assistente).

Padrão derivável: título no particípio ("exportada", "criada") + detalhe
verificável.

## Como se escreve ESTADO VAZIO
**NÃO HÁ EVIDÊNCIA. Não existe nenhum estado vazio no projeto** — nem texto,
nem componente, nem spec. Não invento um padrão aqui.

## Confirmação destrutiva
**[OBSERVADO]** Título em pergunta: **"Excluir automação?"**; corpo explica a
consequência e a irreversibilidade: "Esta ação não pode ser desfeita. A
automação e todo o histórico de disparos serão removidos permanentemente.";
botões nomeiam a ação, não "OK/Sim": **"Cancelar"** / **"Excluir"**.

## Números e unidades
**[OBSERVADO]** Separador de milhar com ponto ("5.880", "6.042"). Tempo
abreviado sem espaço antes da unidade composta: "6h 8min", "1H · Online"
(note o **H maiúsculo** aqui e minúsculo ali — inconsistente). Percentual
colado: "33%", "-22%", "100%". Variação sempre com sinal e parênteses:
"+1 (100%)", "-6 (-46%)". Datas em `DD/MM/AAAA`.

## Dicionário de rótulos
**NÃO EXISTE dicionário de rótulos** no projeto. Não há arquivo de i18n,
nem tabela de termos canônicos. Abaixo estão **todos os rótulos de UI
realmente usados** na origem — é um inventário, não um dicionário aprovado:

| Contexto | Rótulos usados |
|---|---|
| Botões | Primária, Secundária, Ghost, Perigo, Sucesso, Small, Medium, Large, Normal, Hover, Carregando, Desabilitado, Salvar, Cancelar, Excluir, Abrir modal, Disparar toast, Customizar, Criar, Anterior, Próxima, Ativar, Ver mais |
| Campos | Nome da automação, Buscar, Evento, Descrição, E-mail · com erro, Selecione um evento…, Notificar por email, Enviar push no app, Automação ativa, Modo rascunho |
| Navegação | Visão geral, Cores, Tipografia, Espaçamento, Elevação, Iconografia, Botões, Inputs & Forms, Badges & Status, Cards & Painéis, Métricas, Navegação, Tabelas, Overlays, Feedback, Data viz, Comunidade, Cursos, Eventos, Loja, Admin, Usuários, Detalhes, Página inicial, Flashcards, Painel administrativo, Comunicados, Posts Salvos |
| Tags | LIVE, ONLINE, EM BREVE, PÚBLICO, VIA ACELERAÇÃO, ESGOTADO, EM 1 SEMANA, AVISO |
| Métricas | MATRÍCULAS ÚNICAS, CONCLUSÕES, TEMPO ASSISTIDO, ÚLTIMOS 7 DIAS, PERÍODO ANTERIOR, ANTERIOR, Cursos, Aulas, Módulos, Ranking, Taxa de conclusão, Atividade ao longo do tempo, Usuários Conectados, Mais acessos, Sequências de login, Dias consecutivos, Por quantidade, online, rascunhos, concluído, pts, pontos |
| Tabela | USUÁRIO, E-MAIL, SELO, CADASTRO, Página 1 de 410 |
| Status | Online, Offline, Ativa, Inativa |
