import { comparison as c } from '../../data/content'
import { XCircle, PngIcon } from '../ui/icons'
import { CtaButton } from '../ui/CtaButton'
import { Reveal } from '../ui/Reveal'

const base = import.meta.env.BASE_URL

export function Comparison() {
  return (
    <section
      id="comparativo"
      className="relative z-10 bg-[linear-gradient(180deg,#004594_0%,#063079_55%,#04205f_100%)] text-white"
      aria-labelledby="cmp-title"
    >
      <div className="container-x py-16 md:py-24">
        <Reveal from="down">
          {/* Mesma grade da tabela: logo na coluna 1 (sobre "Funcionalidade"),
              título nas colunas 2-3 (alinhado sobre os cards Mercado Comum/Somno). */}
          <div className="flex flex-col items-start gap-5 md:grid md:grid-cols-[1.7fr_1fr_1.05fr] md:items-center md:gap-x-4">
            <img
              src={`${base}assets/logo-somno.webp`}
              width={534}
              height={234}
              alt="Somno"
              className="h-20 w-auto shrink-0 md:h-28 md:justify-self-center"
              loading="lazy"
              decoding="async"
            />
            {/* Título + subtítulo nas colunas 2-3; bloco com a largura do título (w-fit)
                para o subtítulo caber certinho na largura do título, alinhado à esquerda. */}
            <div className="md:col-span-2 md:w-fit">
              <h2
                id="cmp-title"
                className="font-helvetica text-[1.85rem] font-normal leading-[1.13] tracking-normal sm:text-[2.25rem]"
              >
                {/* 3 linhas como no print (quebras fixas só no desktop; mobile quebra natural). */}
                <span className="text-white">Não é só mais um sistema de <br className="hidden sm:inline" />massagem.</span>{' '}
                <span className="text-azure">Compare e veja a <br className="hidden sm:inline" />diferença.</span>
              </h2>
              <p className="mt-3 text-sm leading-snug text-white/70">{c.sub}</p>
            </div>
          </div>
        </Reveal>

        {/* ---- Tabela (desktop) ---- */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-[1.7fr_1fr_1.05fr] gap-x-4">
            {/* Coluna 1 — Funcionalidade (conteúdo centralizado; linhas recuadas e mais visíveis) */}
            <Reveal from="up" className="flex flex-col">
              <div className="flex h-20 items-end justify-center pb-4 text-center text-lg font-semibold text-white/90">Funcionalidade</div>
              <ul className="divide-y divide-white/25 px-7">
                {c.rows.map((r) => (
                  <li key={r.f} className="flex h-14 items-center justify-center text-center text-[0.95rem] text-white/90">
                    {r.f}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Coluna 2 — Mercado Comum */}
            <Reveal from="left" delay={0.06} className="overflow-hidden rounded-3xl bg-white text-ink shadow-soft">
              <div className="flex h-20 flex-col items-start justify-center px-7">
                <span className="text-lg font-bold text-black">{c.colCommon}</span>
                <span className="text-xs font-bold text-black">{c.colCommonSub}</span>
              </div>
              <ul className="divide-y divide-line px-7 pb-5">
                {c.rows.map((r) => (
                  <li key={r.f} className="flex h-14 items-center gap-2 text-left text-sm text-ink/75">
                    {r.neg && <XCircle className="h-[18px] w-[18px] shrink-0" />}
                    <span>{r.common}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Coluna 3 — Somno (destaque) */}
            <Reveal from="right" delay={0.12}>
              <div className="card-hover overflow-hidden rounded-3xl bg-gradient-to-b from-azure to-azure-600 text-white shadow-[0_24px_50px_-20px_rgba(0,173,238,0.6)] ring-1 ring-white/30 hover:shadow-[0_36px_66px_-20px_rgba(0,173,238,0.85)]">
                <div className="flex h-20 items-center px-7 text-2xl font-bold">{c.colSomno}</div>
                <ul className="divide-y divide-white/45 px-7 pb-5">
                  {c.rows.map((r) => (
                    <li key={r.f} className="group flex h-14 items-center gap-2.5 text-left text-sm font-medium">
                      <PngIcon name="check-somno" className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                      <span>{r.somno}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ---- Cards empilhados (mobile) ---- */}
        <div className="mt-10 space-y-3 md:hidden">
          {c.rows.map((r, i) => (
            <Reveal
              as="div"
              key={r.f}
              from={i % 2 ? 'right' : 'left'}
              delay={i * 0.05}
              className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10"
            >
              <div className="font-semibold text-white">{r.f}</div>
              <div className="mt-3 space-y-2">
                <div className="flex items-center justify-between rounded-lg bg-white/90 px-3 py-2 text-ink">
                  <span className="text-xs font-medium text-muted">{c.colCommon}</span>
                  <span className="flex items-center gap-1.5 text-sm">
                    {r.neg && <XCircle className="h-4 w-4" />}
                    {r.common}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-azure to-azure-600 px-3 py-2 text-white">
                  <span className="text-xs font-medium text-white/80">{c.colSomno}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <PngIcon name="check-somno" className="h-4 w-4" />
                    {r.somno}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>

      {/* CTA centralizado bem na divisão entre esta seção e a próxima (metade em cada). */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex translate-y-1/2 justify-center px-4">
        <CtaButton label={c.cta} />
      </div>
    </section>
  )
}
