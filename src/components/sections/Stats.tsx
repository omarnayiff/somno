import { stats } from '../../data/content'
import { Reveal } from '../ui/Reveal'
import { PngIcon } from '../ui/icons'

const base = import.meta.env.BASE_URL

export function Stats() {
  return (
    <section className="bg-navy text-white" aria-labelledby="stats-title">
      <div className="container-x grid gap-10 pt-20 pb-14 md:grid-cols-[0.85fr_1.45fr] md:gap-12 md:pt-28 md:pb-20">
        <div>
          {/* Logo (tamanho original). Bloco normal (não-flex) p/ o w-auto
              preservar a proporção do logo e não esticar. */}
          <img
            src={`${base}assets/logo-rainoah-white.webp`}
            width={1000}
            height={274}
            alt="Rainoah"
            className="h-14 w-auto md:h-16"
            loading="lazy"
            decoding="async"
          />
          {/* Título logo abaixo do logo (sobe), 4 linhas fixas. Mesmo texto de
              stats.headingAccent + stats.headingRest, com quebras manuais. */}
          <h2
            id="stats-title"
            className="mt-7 font-helvetica text-[clamp(2rem,4.55vw,3.25rem)] font-normal leading-[1.13] tracking-normal"
          >
            <span className="text-azure">
              39 anos no
              <br />
              mercado.
            </span>{' '}
            <span className="text-white">
              E o
              <br />
              maior ainda
              <br />
              está por vir.
            </span>
          </h2>
          {/* Subtítulo em 6 linhas (23rem cai no meio da faixa que quebra em 6). */}
          <p className="mt-5 max-w-[23rem] font-helvetica text-[1.5rem] font-normal leading-[1.61] tracking-normal text-white/80">
            {stats.paragraph}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {stats.cards.map((c, i) => {
            // 3 cards de cima: gradiente #00ADEE→#006388; os de baixo: brancos.
            // Cards um pouco mais altos (retrato) e raio de borda menor.
            const colored = i < 3
            return (
              <Reveal
                as="li"
                key={c.value}
                delay={i * 0.05}
                className={`card-hover group flex aspect-[303/390] flex-col rounded-[38px] border-[3px] p-6 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.6)] hover:shadow-[0_34px_60px_-24px_rgba(0,0,0,0.55)] ${
                  colored
                    ? 'border-white/35 hover:border-white/70 bg-gradient-to-b from-[#00ADEE] to-[#006388] text-white'
                    : 'border-[#dbe6f1] hover:border-azure bg-white text-navy'
                }`}
              >
                <PngIcon name={c.icon} className="h-20 w-20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
                <div className="mt-5 text-[1.7rem] font-extrabold leading-none">{c.value}</div>
                <p className={`mt-2 text-sm leading-snug ${colored ? 'text-white/90' : 'text-navy'}`}>{c.label}</p>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
