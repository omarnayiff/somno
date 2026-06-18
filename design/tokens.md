# Design tokens — Somno

> Fonte: **amostragem de pixels dos prints** do Figma (não houve Dev Mode/export).
> Os valores de cor abaixo foram **amostrados** (mais fiéis que estimativa a olho).
> Centralizados em `src/styles/globals.css` (`@theme`) e consumidos via Tailwind.

## Cores (amostradas dos prints)

| Token Tailwind | Hex | Uso |
|---|---|---|
| `navy-900` | `#052574` | Navy profundo — gradiente do comparativo |
| `navy-800` | `#003F86` | Hover de botões/variações |
| `navy` (primária) | `#004594` | Fundos escuros: Stats, Aplicações, Benefícios, Footer; texto do Hero |
| `navy-600` | `#0A57AE` | Início do gradiente das pílulas de CTA |
| `azure` | `#00ADEE` | Azul vibrante: fundo do Formulário, cards de Benefícios, coluna Somno, destaques sobre navy |
| `azure-600` | `#0093CC` | Destaque (texto ciano) **sobre fundo claro** — escolhido p/ manter contraste AA |
| `azure-700` | `#0077A8` | Apoio |
| `sky` | `#29B6F0` | Apoio claro |
| `indigo-brand` | `#2E3192` | Azul do logotipo Somno (referência) |
| `ink` | `#0E1726` | Texto principal escuro |
| `muted` | `#5B6675` | Texto secundário |
| `line` | `#DFE5EC` | Divisórias/bordas suaves |
| `surface` | `#EEF1F5` | Cinza claro: seção Vídeo, coluna "Mercado Comum" |
| `card-dark` | `#0C2238` | Card de features "Colchões" (gradiente p/ navy-900) |
| `charcoal` | `#2B2F36` | Card de features "Spring" |

> ⚠️ **A confirmar com o Figma:** os hexes acima vieram de amostragem dos prints
> (compressão de imagem pode deslocar levemente o tom). Se quiser precisão absoluta,
> me passe os hexes oficiais — troca em 1 lugar (`globals.css`).

## Tipografia

- **Família:** **Inter** (variable) — **inferida** pela forma das letras (grotesca neutra).
  Self-hosted via `@fontsource-variable/inter` (sem requisição externa; só o subset
  latino é baixado em runtime via `unicode-range`). `font-display: swap`.
- **Pesos usados:** 400 (corpo), 500/600 (rótulos), 700/800 (títulos).
- **Escala (aprox.):** H1 hero ~2.1–3rem; H2 seções ~1.9–2.6rem; corpo 1–1.125rem;
  legendas 0.75–0.875rem. `line-height` ~1.06 em títulos, ~1.6 em corpo;
  `letter-spacing` -0.01em em títulos.

## Layout / espaçamento

- **Container:** `max-width: 1200px`, padding lateral `1.25rem` (`.container-x`).
- **Ritmo vertical:** seções com `py-14 md:py-20/24` (derivado do frame inteiro).
- **Grid:** 12 colunas nas seções de produto (imagem 7 / card 6, com sobreposição).

## Raio, sombra, animação

- **Raio:** cards `1.25–1.5rem`; pílulas `999px` (`rounded-pill`).
- **Sombras:** `shadow-soft` e sombras específicas por seção (tons de navy/preto).
- **Animação:** entrada em scroll (fade + slide ~22px, 0.55s, stagger 0.05–0.06s)
  via `motion`; **respeita `prefers-reduced-motion`** (desliga animações).

## Breakpoints (Tailwind padrão)

`sm 640` · `md 768` · `lg 1024` · `xl 1280`. Mobile-first.

## Decisões inferidas (validar)

- **Fonte Inter** (inferida dos prints).
- **Cor de destaque sobre fundo claro** levemente mais escura (`#0093CC`) que o azul
  vibrante (`#00ADEE`) para passar contraste AA em texto grande.
- **Divisores** onda (Hero→Stats) e nuvens (Vídeo→Benefícios): recriados em SVG.
- **Estados** hover/focus de botões, inputs e cards: criados de forma coerente.
- **Mobile** derivado do desktop (empilhamento, tabela vira cards).
- **Footer:** pouco detalhe no print — logo Somno + copyright + link (inferido).
