import type { CSSProperties } from 'react'

const base = import.meta.env.BASE_URL

/** Circulo azul com check — usado na coluna Somno e nas listas de features. */
export function CheckCircle({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="currentColor" />
      <path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Circulo vermelho com X — usado na coluna "Mercado Comum". */
export function XCircle({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="none" stroke="#e5484d" strokeWidth="2" />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#e5484d" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/** Chevron para a direita (dentro do circulo dos CTAs). */
export function ArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function PlayIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
    </svg>
  )
}

/** Icone PNG (linha) dos assets. `white` recolore para branco via filtro. */
export function PngIcon({
  name,
  className = 'h-9 w-9',
  white = false,
}: {
  name: string
  className?: string
  white?: boolean
}) {
  const style: CSSProperties | undefined = white
    ? { filter: 'brightness(0) invert(1)' }
    : undefined
  return (
    <img
      src={`${base}icons/${name}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
    />
  )
}
