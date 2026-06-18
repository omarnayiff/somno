// Injeta o HTML pré-renderizado de <App/> dentro do dist/index.html (SSG).
// Roda depois de: vite build (cliente) + vite build --ssr (servidor).
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const indexFile = path.join(root, 'dist', 'index.html')
const serverEntry = path.join(root, 'dist', 'server', 'entry-server.js')

const template = readFileSync(indexFile, 'utf-8')
const { render } = await import(`file://${serverEntry}`)
const appHtml = render()

const html = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
writeFileSync(indexFile, html)

// limpa o bundle de servidor (não vai para produção)
rmSync(path.join(root, 'dist', 'server'), { recursive: true, force: true })

console.log('✓ index.html pré-renderizado (SSG)')
