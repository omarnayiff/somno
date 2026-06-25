// Otimiza as imagens-fonte (pesadas) para WebP/AVIF nos tamanhos reais de
// exibicao, gravando em public/assets e public/icons.
// Uso: npm run optimize:img
import sharp from 'sharp'
import { mkdir, copyFile, readdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const IMG = path.join(root, 'images')
const ICO = path.join(root, 'icones')
const OUT_ASSETS = path.join(root, 'public', 'assets')
const OUT_ICONS = path.join(root, 'public', 'icons')

// Fotos grandes (paisagem ~1672x940). Hero em meia/coluna -> 1400w cobre retina.
// colchoes/spring sao exibidas FULLBLEED (100vw) -> usar a resolucao nativa (1672)
// p/ nao dar upscale e perder qualidade em telas largas.
const HERO_LIKE = [
  { src: 'hero.jpg', out: 'hero', width: 1400, og: true },
  { src: 'c0abfccc0bc066b178e068f811dadb0f728eb197.png', out: 'colchoes', width: 1672 },
  { src: '5eb6fda16988bf5cdf86a4850858c4b5cf173e7a.png', out: 'spring', width: 1672 },
  { src: 'img-cards.jpg', out: 'img-cards', width: 1200 },
  { src: 'img-card2.png', out: 'img-card2', width: 1200 },
]

// Fotos verticais (2731x4096) usadas em cards pequenos da secao "Aplicacoes".
// Recorte cover 4:3 centralizado.
const APP_CARDS = [
  { src: '72c3cbe1671638ae3e16d60067868efd45b9a237.jpg', out: 'app-colchoes' },
  { src: 'f25e9ed76150378d1f182de3849ddc3f452e0d87.jpg', out: 'app-poltronas' },
  { src: '42e64e00f0e8c8ef770d08a7609ef3758e56f825.jpg', out: 'app-sofas' },
  { src: '985b2bb97de034df4dde6c4f144e9d4d08b9bc4e.jpg', out: 'app-barbeiro' },
  { src: '07371ba315169bf040012d0693575eae4f1fbb04.jpg', out: 'app-odonto' },
]

// Icones (linha, azul/navy) -> nomes limpos. Mantidos como PNG (ja sao leves).
const ICON_MAP = {
  'business_13991849 1.png': 'icon-growth.png',
  'plugin_11814752 1.png': 'icon-plug.png',
  'quality_10498248 1.png': 'icon-badge.png',
  'approve_13897219 1.png': 'icon-support.png',
  'gps_15949717 1.png': 'icon-location.png',
  'body-massage_2091161 1.png': 'icon-massage.png',
  'money_925116 1.png': 'icon-money.png',
  'revenue_9413242 1.png': 'icon-revenue.png',
  'healthcare_17167185 1.png': 'icon-health.png',
  'checklist_17836274 6.png': 'icon-checklist.png',
  'affiliate-marketing_6526547 1.png': 'icon-network.png',
  '_x33_7_Positive_Experience.png': 'icon-positive.png',
}

async function run() {
  await mkdir(OUT_ASSETS, { recursive: true })
  await mkdir(OUT_ICONS, { recursive: true })

  let totalIn = 0
  let totalOut = 0
  const sizeOf = async (p) => (existsSync(p) ? (await sharp(p).metadata(), (await import('node:fs')).statSync(p).size) : 0)

  for (const { src, out, width, og } of HERO_LIKE) {
    const inPath = path.join(IMG, src)
    if (!existsSync(inPath)) { console.warn('!! faltando', src); continue }
    totalIn += (await import('node:fs')).statSync(inPath).size
    const base = sharp(inPath).resize({ width, withoutEnlargement: true })
    await base.clone().webp({ quality: 80 }).toFile(path.join(OUT_ASSETS, `${out}.webp`))
    await base.clone().avif({ quality: 55 }).toFile(path.join(OUT_ASSETS, `${out}.avif`))
    await base.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT_ASSETS, `${out}.jpg`))
    totalOut += (await import('node:fs')).statSync(path.join(OUT_ASSETS, `${out}.webp`)).size
    // Variantes menores p/ srcset (mobile/tablet baixa imagem do tamanho certo -> LCP).
    for (const w of [640, 960, 1280]) {
      const small = sharp(inPath).resize({ width: w, withoutEnlargement: true })
      await small.clone().webp({ quality: 78 }).toFile(path.join(OUT_ASSETS, `${out}-${w}.webp`))
      await small.clone().avif({ quality: 52 }).toFile(path.join(OUT_ASSETS, `${out}-${w}.avif`))
    }
    if (og) {
      await sharp(inPath).resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
        .jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(OUT_ASSETS, 'og-image.jpg'))
    }
    console.log('foto:', out)
  }

  for (const { src, out } of APP_CARDS) {
    const inPath = path.join(IMG, src)
    if (!existsSync(inPath)) { console.warn('!! faltando', src); continue }
    totalIn += (await import('node:fs')).statSync(inPath).size
    const base = sharp(inPath).resize({ width: 640, height: 480, fit: 'cover', position: 'attention' })
    await base.clone().webp({ quality: 74 }).toFile(path.join(OUT_ASSETS, `${out}.webp`))
    await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(OUT_ASSETS, `${out}.jpg`))
    totalOut += (await import('node:fs')).statSync(path.join(OUT_ASSETS, `${out}.webp`)).size
    console.log('card:', out)
  }

  // Logo azul (com transparencia) -> webp + png
  const logoSrc = path.join(IMG, 'cf0f6865383858e9b25f1e4aa3dadbbc51e7f976.png')
  if (existsSync(logoSrc)) {
    await sharp(logoSrc).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_ASSETS, 'logo-somno.webp'))
    await copyFile(logoSrc, path.join(OUT_ASSETS, 'logo-somno.png'))
    console.log('logo: somno')
  }
  // Logo LIDER (parceiro homologador) -> webp + png (mantem transparencia)
  const liderSrc = path.join(IMG, 'logo 1.png')
  if (existsSync(liderSrc)) {
    await sharp(liderSrc).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_ASSETS, 'logo-lider.webp'))
    await copyFile(liderSrc, path.join(OUT_ASSETS, 'logo-lider.png'))
    console.log('logo: lider')
  }
  // Logo SPRINGFLEX (parceiro homologador do comparativo de poltronas) -> webp + png
  const springSrc = path.join(IMG, 'logo2.png')
  if (existsSync(springSrc)) {
    await sharp(springSrc).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(OUT_ASSETS, 'logo-springflex.webp'))
    await copyFile(springSrc, path.join(OUT_ASSETS, 'logo-springflex.png'))
    console.log('logo: springflex')
  }
  // Logo RAINOAH branco (ja webp leve) -> copia
  const whiteSrc = path.join(IMG, 'branca (1).webp')
  if (existsSync(whiteSrc)) {
    await copyFile(whiteSrc, path.join(OUT_ASSETS, 'logo-rainoah-white.webp'))
    console.log('logo: rainoah branco')
  }

  // Icones -> nomes limpos
  const icons = await readdir(ICO)
  for (const file of icons) {
    const clean = ICON_MAP[file]
    if (!clean) continue
    await copyFile(path.join(ICO, file), path.join(OUT_ICONS, clean))
  }
  console.log('icones:', Object.keys(ICON_MAP).length)

  console.log(`\nEntrada total (fotos): ${(totalIn / 1e6).toFixed(1)} MB`)
  console.log(`Saida principal (webp): ${(totalOut / 1e3).toFixed(0)} KB`)
}

run().catch((e) => { console.error(e); process.exit(1) })
