import { ArrowRight } from './icons'

type Props = {
  label: string
  href?: string
  className?: string
  arrow?: boolean
  /** brilho pulsante contínuo p/ chamar atenção (CTA principal) */
  glow?: boolean
}

/** Pílula de CTA padrão da página: gradiente navy→azure + círculo com seta. */
export function CtaButton({ label, href = '#contato', className = '', arrow = true, glow = false }: Props) {
  return (
    <a
      href={href}
      className={`btn-shine group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-navy-600 to-azure bg-[length:100%_100%] bg-left px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-12px_rgba(0,69,148,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-12px_rgba(0,173,238,0.85)] active:translate-y-0 active:scale-[0.98] ${glow ? 'cta-glow' : ''} ${className}`}
    >
      <span className="relative z-[3]">{label}</span>
      {arrow && (
        <span className="relative z-[3] grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-3">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </a>
  )
}
