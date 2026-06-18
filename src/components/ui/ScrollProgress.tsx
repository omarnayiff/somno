import { useEffect, useRef } from 'react'

/**
 * Barra fina no topo que reflete o progresso de leitura da página.
 * Atualiza via requestAnimationFrame + scroll passivo (custo mínimo).
 * Visual puro/decorativo (aria-hidden); respeita prefers-reduced-motion
 * pela transição neutralizada na regra global.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const p = max > 0 ? h.scrollTop / max : 0
      el.style.setProperty('--progress', String(p))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <div ref={ref} className="scroll-progress" aria-hidden="true" />
}
