# Brief — Replicar Landing Page (Figma → estático → GitHub → Cloudflare Pages / Hostinger)


---

## 0. TL;DR para o Claude Code

Você vai **replicar fielmente** uma landing page desenhada no Figma, usando **apenas referências visuais**:
- **prints de cada seção** (referência de fidelidade de cada bloco);
- **print do frame inteiro** (contexto global: espaçamento, escala de fontes e proporções entre seções);
- a pasta de **assets** (imagens, ícones, logo) já baixados.

Saída: **site estático** (HTML/CSS/JS buildado), versionado em **GitHub**, pronto para subir em **Cloudflare Pages** ou **Hostinger**. **Não** invente conteúdo, cores ou layout. Cores e valores são estimados dos prints; **em caso de dúvida (sobretudo cor de marca), pergunte o valor exato ao usuário** — ele tem o Figma aberto e responde na hora.

---

## 1. Objetivo

Recriar a landing page **pixel-faithful** ao design, responsiva, animada de forma sutil e otimizada para produção (performance + SEO + acessibilidade). Resultado final = pasta de build estática que roda em qualquer host.

---

## 2. Fonte de verdade do design — APENAS PRINTS

A referência é **100% visual, baseada nos prints**. Não há Figma Dev Mode, MCP, nem arquivo de tokens exportado. Você trabalha com:

- **Prints de cada seção** — sua referência principal de fidelidade para cada bloco.
- **Print do frame inteiro** — referência de **contexto global**: proporção entre as seções, ritmo de espaçamento vertical, escala tipográfica relativa (tamanho de um h1 vs. body), consistência de cores e larguras de container ao longo da página. Use-o para garantir coerência entre seções, não só dentro de cada uma.

Como extrair valores dos prints:
- **Cores, tipografia, spacing, radius, sombras** são **estimados a olho** a partir das imagens. Meça proporções relativas no frame inteiro para manter a escala correta.
- Para tipografia, identifique a **família** pela forma das letras; se não tiver certeza, proponha a mais provável **e marque como inferida**.

### Protocolo de dúvida (IMPORTANTE)

Quando você não tiver certeza de um valor — **principalmente cor exata** (marca, gradiente, fundo), mas também fonte específica, peso ou um espaçamento crítico — **PARE e pergunte ao usuário**, indicando exatamente:
- **qual elemento** e **em qual seção** (ex.: "cor do botão CTA do Hero", "fundo da seção de Pricing");
- **o que você estimou** (ex.: "estimei `#1E40AF`");
- **a pergunta direta**: "qual é o hex exato dessa cor?".

O usuário tem o Figma aberto e **vai te passar o valor exato na hora**. É melhor perguntar do que chutar uma cor de marca. Acumule as dúvidas e pergunte em lote quando fizer sentido (ex.: todas as cores ao montar os tokens), para não travar o fluxo.

Tudo que você **estimou sem confirmar**, registre no relatório (seção 14) para o usuário validar depois.

---

## 3. Stack técnico

- **Vite + React + TypeScript**
- **Tailwind CSS** (configurar tokens do design no `tailwind.config` / `@theme`)
- **Motion** (`motion`/`framer-motion`) ou **Intersection Observer** puro para animações de entrada no scroll
- Build estático → pasta **`dist/`**

Regras:
- Saída 100% estática (sem servidor, sem SSR). Tudo precisa rodar abrindo os arquivos no host.
- Componentizar por **seção** (`<Hero/>`, `<Features/>`, `<Pricing/>`, `<Footer/>`, etc.).
- Zero dependências pesadas desnecessárias. Mantenha o bundle enxuto.

> Alternativa aceita: **Next.js com `output: 'export'`**. Se for por esse caminho, configurar `basePath`/`assetPrefix` conforme o host e gerar `out/` estático.

---

## 4. Estrutura de pastas esperada

Antes de codar, **inventarie** o que já existe (prints + assets) e proponha esta estrutura:

```
/
├─ public/
│  ├─ assets/           # imagens e logo otimizados (webp/avif + fallback)
│  ├─ icons/            # SVGs dos ícones
│  ├─ favicon, og-image, robots.txt, sitemap.xml
├─ src/
│  ├─ components/sections/   # uma seção = um componente
│  ├─ components/ui/         # botões, badges, cards reutilizáveis
│  ├─ styles/                # globals + design tokens
│  ├─ App.tsx, main.tsx
├─ design/
│  ├─ prints/           # screenshots de seção + frame inteiro (read-only p/ comparação)
│  └─ tokens.md         # cores, fontes, spacing estimados dos prints (+ confirmados pelo usuário)
├─ index.html
├─ tailwind.config.*  /  vite.config.*  /  tsconfig.json
├─ _redirects  _headers  .htaccess   # configs de deploy (ver seção 12)
├─ .gitignore  README.md  CLAUDE.md
```

> Os prints e assets que o usuário forneceu já estão na pasta dele — **primeiro liste e mapeie tudo** (`ls`/leitura) e me diga o que encontrou antes de assumir nomes.

---

## 5. Workflow obrigatório (passo a passo)

1. **Inventário.** Liste todos os prints (identificando quais são **prints de seção** e qual é o **print do frame inteiro**) e todos os assets. Mapeie cada asset → onde ele aparece (qual seção/print). Liste o que falta (ex.: um ícone que aparece no print mas não tem arquivo) e **avise**. Use o frame inteiro para definir a ordem das seções.
2. **Tokens.** Defina `design/tokens.md` estimando a partir dos prints: paleta, tipografia (famílias + pesos), escala de spacing, radius, sombras, breakpoints. Identifique as **fontes** do design e configure (Google Fonts ou self-host com `@font-face` + preload). **Para cada cor que você não tiver certeza, pergunte o hex exato ao usuário antes de fechar os tokens** (ver Protocolo de dúvida na seção 2).
3. **Setup.** Scaffold do Vite + React + TS + Tailwind, tokens já no config. Build "hello world" deve compilar limpo antes de seguir.
4. **Seção por seção (loop):** para CADA seção, na ordem de cima pra baixo:
   - abra o print correspondente como referência;
   - construa o componente (HTML semântico + Tailwind);
   - use **apenas os assets fornecidos** (não gere/baixe imagens novas sem pedir);
   - **renderize e compare** com o print; ajuste espaçamento/alinhamento/cor até bater;
   - só então passe para a próxima seção.
5. **Responsividade.** Depois de cada seção (ou ao final, mas antes de fechar), valide mobile-first nos breakpoints (seção 8).
6. **Animações.** Adicione microinterações sutis (seção 9).
7. **Polimento.** Acessibilidade, performance e SEO (seções 10–11).
8. **Configs de deploy + README** (seção 12).
9. **Relatório final** (seção 14).

Faça **commits pequenos e descritivos** a cada seção concluída.

---

## 6. Design tokens

Centralize tudo em tokens (Tailwind theme + CSS vars). Nada de cores/sizes "soltos" no JSX. Inclua no mínimo:
- **Cores:** primária, secundária, neutros, fundo, texto, estados (hover/disabled), gradientes.
- **Tipografia:** família(s), pesos usados, escala de tamanhos com line-height e letter-spacing por nível (h1…body…caption).
- **Spacing/Layout:** largura máxima do container, gutters, escala de espaçamento, grid.
- **Radius, sombras, blur, transições.**

---

## 7. Regras de fidelidade (inegociáveis)

- Replique **alinhamento, espaçamento, hierarquia e proporções** do print.
- **Cores e fontes:** estime dos prints e, em caso de dúvida, **confirme o valor exato com o usuário** (Protocolo de dúvida, seção 2). Não substitua a fonte do design por uma "parecida" sem avisar.
- **Use só os assets fornecidos.** Ícone/imagem faltando → liste e pergunte; não invente placeholder definitivo.
- Otimize assets: imagens em **WebP/AVIF** com fallback, `width`/`height` definidos (evitar layout shift), `loading="lazy"` abaixo da dobra, ícones em **SVG** inline ou sprite.
- **Não adicione seções, textos ou CTAs** que não estão no design. Copy = exatamente o que está no print (transcreva com cuidado).
- Estados não mostrados no print (hover, focus, active, mobile menu aberto) → implemente de forma coerente com o estilo e **sinalize** que foram inferidos.

---

## 8. Responsividade

Mobile-first. Breakpoints alvo (ajuste se o design indicar outros): **360 / 768 / 1024 / 1280 / 1440+**.
- Se só houver print desktop, **derive** mobile de forma coerente (stack vertical, reordenação lógica, menu hamburguer) e marque como inferido.
- Garanta toque confortável (alvos ≥ 44px), sem overflow horizontal, imagens fluidas.

---

## 9. Animações e microinterações

- Entrada sutil ao entrar na viewport (fade/slide curto), stagger leve em listas/cards.
- Hover/focus suaves em botões e links; transições 150–300ms.
- **Respeitar `prefers-reduced-motion`** (desligar/atenuar).
- Nada que prejudique LCP/CLS. Animação serve o design, não o contrário.

---

## 10. Acessibilidade

- HTML semântico (`header`, `nav`, `main`, `section`, `footer`), heading hierarchy correta.
- `alt` descritivo em imagens; ícones decorativos com `aria-hidden`.
- Foco visível, navegação por teclado, contraste mínimo AA.
- Labels em qualquer campo de formulário; `lang` no `<html>`.

---

## 11. Performance e SEO

- Meta tags: `title`, `description`, **Open Graph** + **Twitter Card** (com `og-image`), `theme-color`, viewport.
- `favicon`, `robots.txt`, `sitemap.xml`, URL canônica.
- Preload da fonte principal; `font-display: swap`.
- Lazy-load abaixo da dobra; comprimir assets; tree-shaking.
- Meta: **Lighthouse 90+** em Performance/Acessibilidade/Best Practices/SEO. Reporte os números.

---

## 12. Deploy (GitHub → Cloudflare Pages / Hostinger)

Gerar saída estática e os arquivos de config para **ambos** os hosts (o usuário decide depois):

**Build**
- Comando: `npm run build` → saída em **`dist/`** (ou `out/` se Next export).

**GitHub**
- `.gitignore` (node_modules, dist, .env, etc.), `README.md` com passos de build e deploy. Commits limpos.

**Cloudflare Pages**
- Conectar o repo. Build command `npm run build`, **output dir `dist`**.
- Incluir `public/_redirects` e `public/_headers` se forem úteis (cache de assets, segurança). Landing single-page geralmente não precisa de fallback SPA, mas deixe documentado.

**Hostinger**
- Caminho A (estático/shared): subir o **conteúdo de `dist/`** para `public_html` (ou usar o **Git deploy** da Hostinger apontando para a pasta de build).
- Incluir um **`.htaccess`** (Apache) com: compressão (gzip/brotli se disponível), cache de assets, redirect HTTPS, e — se em algum momento virar SPA com rotas — fallback para `index.html`.
- Caminho B (VPS): documentar no README, mas o entregável base continua sendo o `dist/` estático.

> Garanta **caminhos de asset relativos** (ou base correta) para o site funcionar igual nos dois hosts e em subpasta, se for o caso.

---

## 13. Checklist de QA antes de entregar

- [ ] Cada seção bate visualmente com seu print (desktop) — comparação feita.
- [ ] Responsivo OK em 360/768/1024/1280/1440.
- [ ] Cores, fontes e spacing conferem com os tokens (fonte de verdade).
- [ ] Todos os assets fornecidos usados; nenhum link/imagem quebrada.
- [ ] Animações sutis + `prefers-reduced-motion` respeitado.
- [ ] A11y: semântica, alt, foco, contraste.
- [ ] SEO/meta/OG/favicon/robots/sitemap presentes.
- [ ] `npm run build` gera `dist/` sem erros/warnings críticos.
- [ ] Configs de deploy (`_redirects`/`_headers`/`.htaccess`) + README prontos.
- [ ] Lighthouse rodado e números reportados.

---

## 14. Como você (Claude Code) deve reportar

Ao final (e a cada seção), me entregue um resumo curto com:
1. **Seções construídas** e status de fidelidade (bateu / aproximei / faltou asset).
2. **Decisões inferidas** (estados de hover, mobile derivado de desktop, fontes inferidas, etc.) — para eu validar.
3. **Cores/valores estimados a confirmar** — lista dos hex/fontes que você estimou e quer que eu confirme exato.
4. **Pendências/perguntas** (assets faltando, copy ilegível no print, ambiguidades).
5. **Passos de deploy** prontos para Cloudflare Pages e Hostinger.

**Não chute em pontos críticos de marca (cor/fonte/logo). Em dúvida, pergunte.**

---

### Primeira ação esperada

Comece pelo **passo 1 (Inventário)**: liste os prints (separando os de seção do **print do frame inteiro**) e os assets que encontrou, mapeie asset→seção, aponte o que falta, e proponha a ordem das seções com base no frame inteiro. Só depois siga para os tokens e o scaffold — perguntando os hex de cor que estiverem em dúvida antes de fechar os tokens.
