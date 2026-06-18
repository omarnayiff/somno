const base = import.meta.env.BASE_URL

/**
 * Logotipo Somno. Só existe a versão azul (cf0f...). Para fundos escuros,
 * `white` recolore o PNG para branco via filtro (não há arte branca do Somno).
 */
export function Logo({
  className = 'h-10 w-auto',
  white = false,
  eager = false,
}: {
  className?: string
  white?: boolean
  eager?: boolean
}) {
  return (
    <img
      src={`${base}assets/logo-somno.webp`}
      width={534}
      height={234}
      alt="Somno — o seu melhor sono"
      className={className}
      style={white ? { filter: 'brightness(0) invert(1)' } : undefined}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
