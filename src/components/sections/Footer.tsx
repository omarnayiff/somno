import { Logo } from '../ui/Logo'

export function Footer() {
  const year = 2026
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-x flex flex-col items-center gap-5 py-10 text-center md:flex-row md:justify-between md:text-left">
        <span className="inline-flex rounded-xl bg-white px-4 py-2.5 shadow-sm">
          <Logo className="h-7 w-auto" />
        </span>
        <p className="text-sm text-white/70">
          © {year} Somno · Uma marca Rainoah. Todos os direitos reservados.
        </p>
        <a
          href="#contato"
          className="group text-sm font-semibold text-azure transition-colors duration-300 hover:text-white"
        >
          Garanta sua exclusividade{' '}
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </footer>
  )
}
