const base = import.meta.env.BASE_URL

type Props = {
  /** nome-base do arquivo em /assets (sem extensao) */
  name: string
  alt: string
  width: number
  height: number
  className?: string
  /** true => inclui fonte AVIF (gerada apenas para fotos grandes) */
  avif?: boolean
  loading?: 'lazy' | 'eager'
  fetchPriority?: 'high' | 'low' | 'auto'
  sizes?: string
  /**
   * Larguras extras geradas (ex.: [640, 960]) p/ srcset responsivo.
   * O browser baixa a imagem do tamanho do viewport (LCP melhor no mobile).
   * A largura-base (`width`) entra como maior candidato do srcset.
   */
  srcWidths?: number[]
}

/**
 * <picture> com AVIF/WebP + fallback JPG. width/height evitam layout shift (CLS).
 * Com `srcWidths`, emite srcset (640w/960w/…) p/ servir o tamanho certo por viewport.
 */
export function OptImg({
  name,
  alt,
  width,
  height,
  className,
  avif = false,
  loading = 'lazy',
  fetchPriority = 'auto',
  sizes,
  srcWidths,
}: Props) {
  const srcSetFor = (ext: string) =>
    srcWidths && srcWidths.length
      ? [...srcWidths.map((w) => `${base}assets/${name}-${w}.${ext} ${w}w`), `${base}assets/${name}.${ext} ${width}w`].join(', ')
      : `${base}assets/${name}.${ext}`

  return (
    <picture>
      {avif && <source srcSet={srcSetFor('avif')} type="image/avif" sizes={sizes} />}
      <source srcSet={srcSetFor('webp')} type="image/webp" sizes={sizes} />
      <img
        src={`${base}assets/${name}.jpg`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
      />
    </picture>
  )
}
