# Ícones declarados mas nunca renderizados

Coletei do DOM **76 ícones únicos**, visitando as 16 seções da
página, abrindo o modal e disparando o toast. Comparei com o inventário de
`icons/ICONS.md`.

## Declarado mas nunca renderizado (1)

| Ícone | Onde é declarado | Por que nunca aparece |
|---|---|---|
| `sun` | alternador de tema, quando `theme === 'light'` (`themeIcon`) | **Bug real, não ausência de uso.** O `<i data-lucide>` é substituído por `<svg>` por `lucide.createIcons()` no primeiro render. Nos re-renders o React não recria o `<i>` (o nó que ele conhece já foi trocado por fora), então o ícone **fica travado em `moon`** mesmo com o tema claro ativo. Alternei o tema e confirmei: `sun` nunca entra no DOM. |

**Não inventei o path de `sun`.** Se precisar dele, pegue do pacote Lucide
oficial — ou conserte a causa: trocar `createIcons()` por SVG inline resolve
o bug e a restrição de CDN de uma vez.

## Observações sobre o que foi coletado

- **`palette`** contém quatro `<circle ... fill="currentColor">`. É `currentColor`, não cor fixa — está conforme, mas note que esse ícone tem preenchimento, diferente dos outros (todos só traço).
- Nenhum ícone coletado tem `width`, `height`, `stroke-width` ou cor literal no conteúdo interno — esses atributos vivem no `<svg>` externo, que **não** foi exportado, conforme pedido.
- `viewBox` também não está no arquivo. O destino precisa aplicar `viewBox="0 0 24 24"` no `<svg>` externo, junto de `fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"`.

## Uso no destino

```html
<svg class="cds-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <!-- conteúdo de lucide-inline.json["check"] -->
  <path d="M20 6 9 17l-5-5"></path>
</svg>
```

Versão do Lucide: a que o CDN `unpkg.com/lucide@latest` servia no momento da
coleta. **"latest" não é uma versão** — os paths podem mudar. Fixe uma versão
antes de tratar este arquivo como estável.
