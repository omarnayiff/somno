// Extrai o logotipo "Rainoah" (branco sobre navy) do print e gera um PNG
// branco com fundo TRANSPARENTE, usavel sobre qualquer cor.
// NOTA: extraido do print em baixa resolucao -> substituir pelo vetor oficial.
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const src = path.join(root, 'image copy.png')
const out = path.join(root, 'public', 'assets', 'logo-rainoah.png')

const left = 196, top = 156, w = 366, h = 90

const region = await sharp(src).extract({ left, top, width: w, height: h }).toBuffer()

// alpha = luminancia limiarizada (texto branco -> opaco, navy -> transparente)
const mask = await sharp(region).grayscale().threshold(110).raw().toBuffer()
const white = await sharp({ create: { width: w, height: h, channels: 3, background: '#ffffff' } }).raw().toBuffer()

await sharp(white, { raw: { width: w, height: h, channels: 3 } })
  .joinChannel(mask, { raw: { width: w, height: h, channels: 1 } })
  .resize({ width: w * 2 }) // 2x para nitidez em telas retina
  .png()
  .toFile(out)

console.log('logo-rainoah.png gerado (branco transparente)')
