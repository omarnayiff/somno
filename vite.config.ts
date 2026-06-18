import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base: '/' => deploy na raiz do domínio (Cloudflare Pages e Hostinger/public_html).
// VITE_BASE permite sobrescrever em build (ex.: GitHub Pages usa '/somno/' porque
// o site fica em omarnayiff.github.io/somno/). Local/dev e demais hosts seguem em '/'.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
})
