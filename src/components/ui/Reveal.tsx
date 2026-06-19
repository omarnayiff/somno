import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

/** Direção/estilo da entrada ao revelar no scroll. */
export type RevealFrom =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'zoom'
  | 'zoom-out'
  | 'tilt-left'
  | 'tilt-right'
  | 'flip-up'
  | 'rotate'

type Props = {
  children: ReactNode
  className?: string
  /** atraso em segundos (para stagger manual) */
  delay?: number
  /** ângulo/direção de entrada (padrão: 'up') */
  from?: RevealFrom
  /** deslocamento da translação em px (padrão 26; tilts usam um pouco mais) */
  distance?: number
  /** desfoque inicial em px que nitidez ao entrar (0 = sem blur) */
  blur?: number
  as?: ElementType
  /** legado: equivale a from="up" com distance=y */
  y?: number
}

/**
 * Compõe as CSS vars consumidas por `.reveal` em globals.css. Cada direção
 * mapeia para uma combinação de translate/rotate/scale — assim a mesma
 * transição anima a entrada de qualquer ângulo.
 */
function vars(from: RevealFrom, d: number, blur: number): CSSProperties {
  const v: Record<string, string> = {}
  switch (from) {
    case 'up':
      v['--rv-y'] = `${d}px`
      break
    case 'down':
      v['--rv-y'] = `${-d}px`
      break
    case 'left':
      v['--rv-x'] = `${-d}px`
      break
    case 'right':
      v['--rv-x'] = `${d}px`
      break
    case 'zoom':
      v['--rv-s'] = '0.96'
      v['--rv-y'] = `${d * 0.35}px`
      break
    case 'zoom-out':
      v['--rv-s'] = '1.04'
      break
    case 'tilt-left':
      v['--rv-x'] = `${-d}px`
      v['--rv-ry'] = '7deg'
      v['--rv-y'] = `${d * 0.25}px`
      break
    case 'tilt-right':
      v['--rv-x'] = `${d}px`
      v['--rv-ry'] = '-7deg'
      v['--rv-y'] = `${d * 0.25}px`
      break
    case 'flip-up':
      v['--rv-rx'] = '8deg'
      v['--rv-y'] = `${d}px`
      break
    case 'rotate':
      v['--rv-rz'] = '-3deg'
      v['--rv-s'] = '0.98'
      v['--rv-y'] = `${d}px`
      break
  }
  if (blur > 0) v['--rv-blur'] = `${blur}px`
  return v as CSSProperties
}

/**
 * Anima a entrada do conteúdo ao entrar na viewport, de qualquer ângulo
 * (fade + slide/zoom/tilt + blur opcional), via IntersectionObserver +
 * transição CSS (sem dependência de animação). One-shot: desconecta após
 * revelar. Respeita prefers-reduced-motion (renderiza visível, sem animar).
 */
export function Reveal({
  children,
  className = '',
  delay = 0,
  from,
  distance,
  blur = 0,
  as: Tag = 'div',
  y,
}: Props) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const dir: RevealFrom = from ?? 'up'
  const dist = distance ?? y ?? 16
  const style = { transitionDelay: `${delay}s`, ...vars(dir, dist, blur) } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'reveal-in' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
}
