import { ArrowRight } from './icons'

type Props = {
  label: string
  href?: string
  className?: string
  arrow?: boolean
}

/** Pílula de CTA padrão da página: gradiente navy→azure + círculo com seta. */
export function CtaButton({ label, href = '#contato', className = '', arrow = true }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-navy-600 to-azure px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white shadow-[0_14px_30px_-12px_rgba(0,69,148,0.7)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_38px_-12px_rgba(0,69,148,0.8)] ${className}`}
    >
      <span>{label}</span>
      {arrow && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white text-navy transition-transform duration-200 group-hover:translate-x-0.5">
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      )}
    </a>
  )
}
