import { hero } from '../../data/content'
import { OptImg } from '../ui/OptImg'
import { CtaButton } from '../ui/CtaButton'
import { Logo } from '../ui/Logo'
import { WaveDivider } from '../ui/Dividers'

export function Hero() {
  return (
    <header className="relative isolate flex flex-col overflow-hidden bg-[#eef3f8] min-h-[560px] md:min-h-0 md:h-[68vw] md:max-h-[1000px]">
      {/* Foto de fundo: na proporção da foto aparece quase inteira, sem zoom/corte.
          Ken Burns sutil (zoom lento) dá vida sem causar layout shift. */}
      <div className="animate-kenburns absolute inset-0 -z-20">
        <OptImg
          name={hero.image}
          alt="Mulher relaxando na cama, abraçando um travesseiro"
          width={1400}
          height={787}
          avif
          srcWidths={[640, 960]}
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="h-full w-full object-cover object-[68%_38%] md:object-center md:-translate-y-7"
        />
      </div>
      {/* Scrim diagonal: leve, só no topo-esquerdo (logo/título). Some antes da metade. */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.12)_30%,rgba(255,255,255,0)_55%)]" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center py-12 md:py-16">
        <div className="max-w-xl">
          <Logo eager className="animate-rise mb-7 h-16 w-auto md:h-24" />
          <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-navy sm:text-[2.9rem]">
            Seja o primeiro da sua{' '}
            <br className="hidden sm:inline" />
            região{' '}
            <span className="text-azure-600">
              a levar a{' '}
              <br className="hidden sm:inline" />
              tecnologia Somno
            </span>
          </h1>
          <p
            className="animate-rise mt-5 max-w-md text-lg leading-relaxed text-navy"
            style={{ animationDelay: '0.15s' }}
          >
            {hero.sub}
          </p>
          <div className="animate-rise mt-8" style={{ animationDelay: '0.28s' }}>
            <CtaButton label={hero.cta} glow />
          </div>
        </div>
      </div>

      <WaveDivider fill="#004594" className="absolute inset-x-0 bottom-0 z-[1]" />
    </header>
  )
}
