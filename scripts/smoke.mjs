// Smoke test pós-build: carrega o site servido pelo preview e valida que as
// revelações de scroll hidratam (ganham .reveal-in) sem erros de JS no console.
import { chromium } from 'playwright'

const URL = 'http://localhost:4173/somno/'
const errors = []

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1366, height: 900 } })
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))

await page.goto(URL, { waitUntil: 'networkidle' })

const totalReveals = await page.locator('.reveal').count()
const inViewBefore = await page.locator('.reveal-in').count()

// Rola a página inteira em passos para disparar os IntersectionObservers.
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y <= height; y += 700) {
  await page.evaluate((v) => window.scrollTo(0, v), y)
  await page.waitForTimeout(120)
}
await page.waitForTimeout(600)
const inViewAfter = await page.locator('.reveal-in').count()

// Diagnóstico: quais .reveal visíveis ainda não ativaram após o scroll?
const stragglers = await page.evaluate(() =>
  [...document.querySelectorAll('.reveal')]
    .filter((el) => el.offsetParent !== null && !el.classList.contains('reveal-in'))
    .map((el) => (el.textContent || '').trim().slice(0, 50)),
)
// Fallback: traz cada um ao centro da viewport e espera o IO disparar.
for (const _ of stragglers) {
  await page.evaluate(() => {
    const el = [...document.querySelectorAll('.reveal')].find(
      (e) => e.offsetParent !== null && !e.classList.contains('reveal-in'),
    )
    el?.scrollIntoView({ block: 'center' })
  })
  await page.waitForTimeout(250)
}
await page.waitForTimeout(400)

// Elementos .reveal display:none (ex.: cards mobile sob md:hidden) não têm
// layout, então o IntersectionObserver legitimamente não dispara neles neste
// viewport. Contamos só os renderáveis (offsetParent != null) para a asserção.
console.log('stragglers (não ativaram no scroll em passos):', JSON.stringify(stragglers))

const { renderable, renderableActivated } = await page.evaluate(() => {
  const all = [...document.querySelectorAll('.reveal')]
  const vis = all.filter((el) => el.offsetParent !== null)
  return {
    renderable: vis.length,
    renderableActivated: vis.filter((el) => el.classList.contains('reveal-in')).length,
  }
})

// Confere se a aurora decorativa foi renderizada.
const auroraOrbs = await page.locator('.aurora-orb').count()

await page.screenshot({ path: 'dist/_smoke-full.png', fullPage: true })
await browser.close()

console.log(
  JSON.stringify(
    { totalReveals, renderable, renderableActivated, inViewBefore, inViewAfter, auroraOrbs, errors },
    null,
    2,
  ),
)

if (errors.length) {
  console.error('\n❌ erros de console/página detectados')
  process.exit(1)
}
if (renderableActivated < renderable) {
  console.error(`\n❌ revelações visíveis que não ativaram: ${renderableActivated}/${renderable}`)
  process.exit(1)
}
console.log('\n✓ smoke OK — revelações visíveis hidratam e ativam no scroll, sem erros')
