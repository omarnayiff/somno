import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const url = process.env.URL || 'http://localhost:4173/'
await mkdir('.thumbs', { recursive: true })
const browser = await chromium.launch()

// --- Desktop: uma imagem por seção (enquadramento perfeito) ---
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce', // Reveal renderiza visível (sem opacity:0)
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  const blocks = await page.$$('body > #root > header, body > #root > main > section, body > #root > footer')
  let i = 0
  for (const b of blocks) {
    await b.scrollIntoViewIfNeeded()
    await page.waitForTimeout(120)
    await b.screenshot({ path: `.thumbs/shot-d-${String(i).padStart(2, '0')}.png` })
    i++
  }
  console.log('desktop sections:', i)
  await ctx.close()
}

// --- Mobile: página inteira ---
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  await page.goto(url, { waitUntil: 'networkidle' })
  await page.waitForTimeout(500)
  await page.screenshot({ path: '.thumbs/shot-mobile-full.png', fullPage: true })
  await ctx.close()
}

await browser.close()
console.log('shots done')
