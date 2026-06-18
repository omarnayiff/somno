import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ElementType, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
  /** atraso em segundos (para stagger manual) */
  delay?: number
  /** deslocamento vertical inicial (px) */
  y?: number
  as?: ElementType
}

/**
 * Anima a entrada do conteúdo ao entrar na viewport (fade + slide curto),
 * via IntersectionObserver + transição CSS (sem dependência de animação).
 * Respeita prefers-reduced-motion (renderiza visível, sem animar).
 */
export function Reveal({ children, className = '', delay = 0, y = 22, as: Tag = 'div' }: Props) {
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
      { rootMargin: '0px 0px -70px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const style = { transitionDelay: `${delay}s`, '--reveal-y': `${y}px` } as CSSProperties

  return (
    <Tag ref={ref} className={`reveal ${visible ? 'reveal-in' : ''} ${className}`} style={style}>
      {children}
    </Tag>
  )
}
