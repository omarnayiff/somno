# Somno — Landing Page

Landing page estática da **Somno**, sistema de massagem embarcada para colchões e
poltronas (uma marca **Rainoah**). Recriada fielmente a partir do design do Figma.

- **Stack:** Vite + React + TypeScript + Tailwind CSS v4
- **Saída:** site 100% estático e **pré-renderizado (SSG)** em `dist/`
- **Animações:** entrada em scroll via IntersectionObserver (respeita `prefers-reduced-motion`)
- **Lighthouse:** Desktop **100/100/100/100** · Mobile **99/100/100/100**
  (Performance / Acessibilidade / Best Practices / SEO)

---

## Pré-requisitos

- **Node.js 18+** (recomendado 20+)
- npm

## Instalação

```bash
npm install
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (Vite) com HMR |
| `npm run build` | Type-check + build do cliente + build SSR + **pré-renderização** → `dist/` |
| `npm run preview` | Serve o `dist/` localmente em `http://localhost:4173` |
| `npm run optimize:img` | (Re)gera os assets otimizados (WebP/AVIF/JPG + variantes responsivas) |

### Sobre o build

`npm run build` executa, em ordem:

1. `tsc --noEmit` — checagem de tipos;
2. `vite build` — bundle do cliente em `dist/`;
3. `vite build --ssr` — bundle de servidor temporário em `dist/server/`;
4. `node scripts/prerender.mjs` — renderiza o `<App/>` para HTML e injeta no
   `dist/index.html` (SSG), depois remove `dist/server/`.

O resultado é HTML completo já no `index.html` (bom para SEO, crawlers e LCP),
com o React hidratando por cima.

### Otimização de imagens

Os assets **otimizados** já estão versionados em `public/assets` e `public/icons`,
então **o build funciona sem rodar o otimizador**.

`npm run optimize:img` só é necessário se você alterar as imagens-fonte. Ele lê de
`images/` e `icones/` (imagens-fonte pesadas, **não versionadas** — ver `.gitignore`)
e grava as versões leves em `public/`. As fotos grandes (hero, colchões, spring)
saem em 640w / 960w / 1400w para `srcset` responsivo.

---

## Estrutura

```
public/            assets/icons/fonts otimizados + favicon, robots, sitemap, configs de deploy
src/
  components/sections/   uma seção = um componente (Hero, Stats, Comparison, …)
  components/ui/         botões, ícones, imagem otimizada, reveal, logo, divisores
  data/content.ts        TODO o texto, transcrito dos prints (fonte única de copy)
  styles/globals.css     design tokens (@theme) + base
design/tokens.md         cores/tipografia/spacing estimados dos prints
scripts/                 optimize-images, prerender, shots (QA)
```

---

## Deploy

A saída (`dist/`) é estática e roda em qualquer host. O `base` está em `/`
(deploy na raiz do domínio). Para **subpasta**, ajuste `base` em `vite.config.ts`
(ex.: `'./'` ou `'/sua-subpasta/'`) e rebuild.

### Cloudflare Pages

1. Conecte o repositório no painel do Cloudflare Pages.
2. Configurações de build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
3. `public/_redirects` e `public/_headers` são copiados para `dist/` e aplicados
   automaticamente (cache imutável de assets + headers de segurança).

### Hostinger (hospedagem compartilhada / estática)

1. Rode `npm run build` localmente.
2. Envie **o conteúdo de `dist/`** (não a pasta, mas o que está dentro) para
   `public_html` via Gerenciador de Arquivos ou FTP.
3. O `.htaccess` (incluído em `dist/`) já cuida de HTTPS forçado, compressão
   (gzip/brotli), cache de assets e headers de segurança.

> Alternativa: usar o **Git deploy** da Hostinger apontando para a branch, com a
> pasta de publicação configurada para o resultado do build.

### Hostinger (VPS)

Sirva `dist/` com Nginx/Apache como site estático. Mesmas regras de cache/headers
do `.htaccess`/`_headers` se aplicam (traduza para o `server block` do Nginx se usar Nginx).

---

## Fonte de verdade do design

- **Copy:** `src/data/content.ts` (transcrito dos prints).
- **Tokens (cores/tipografia/spacing):** `design/tokens.md` + `src/styles/globals.css`.
  As cores foram **amostradas dos prints**; para precisão absoluta, confirme os hex
  oficiais no Figma e ajuste no `@theme` do `globals.css` (um único lugar).
