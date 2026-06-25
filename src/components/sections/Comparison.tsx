import type { ReactNode } from 'react'
import { comparison } from '../../data/content'
import { XCircle, PngIcon } from '../ui/icons'
import { CtaButton } from '../ui/CtaButton'
import { OptImg } from '../ui/OptImg'
import { Reveal } from '../ui/Reveal'

const base = import.meta.env.BASE_URL

type ComparisonData = {
  colCommon: string
  colCommonSub: string
  colSomno: string
  rows: readonly { f: string; common: string; somno: string; neg: boolean }[]
  cta: string
}

type Props = {
  /** id único da seção (evita ids duplicados ao repetir o componente) */
  id?: string
  data?: ComparisonData
  /** classe de fundo da <section> — permite fundo contínuo ao empilhar seções */
  bgClassName?: string
  /** nome-base da foto do cabeçalho em /assets (sem extensão) */
  image?: string
  imageAlt?: string
  /** título do meio (aceita quebras com <br/>) */
  title?: ReactNode
  /** nome-base do logo de homologação em /assets (sem extensão) */
  logo?: string
  logoAlt?: string
  /** texto pequeno acima do logo de homologação */
  logoLabel?: string
}

export function Comparison({
  id = 'comparativo',
  data: c = comparison,
  bgClassName = 'bg-[linear-gradient(180deg,#004594_0%,#063079_55%,#04205f_100%)]',
  image = 'img-cards',
  imageAlt = 'Colchão com a tecnologia Somno',
  title = (
    <>
      Somno para<br />Colchões
    </>
  ),
  logo = 'logo-lider',
  logoAlt = 'Lider Espumas e Colchões',
  logoLabel = 'Compatibilidade homologada por',
}: Props = {}) {
  const titleId = `${id}-title`
  return (
    <section
      id={id}
      className={`relative z-10 text-white ${bgClassName}`}
      aria-labelledby={titleId}
    >
      <div className="container-x py-16 md:py-24">
        <Reveal from="down">
          {/* Cabeçalho da seção (fora dos cards): foto do colchão + título +
              selo de homologação, alinhados às 3 colunas da tabela e na mesma
              linha no desktop. */}
          <div className="flex flex-col gap-6 md:grid md:grid-cols-[1.7fr_1fr_1.05fr] md:items-center md:gap-x-4">
            <OptImg
              name={image}
              alt={imageAlt}
              width={1200}
              height={675}
              avif
              srcWidths={[640]}
              sizes="(min-width:768px) 15rem, 65vw"
              className="mx-auto block aspect-[5/4] w-full max-w-[15rem] rounded-2xl object-cover shadow-soft ring-2 ring-white"
            />
            <h2
              id={titleId}
              className="font-helvetica text-[2rem] font-normal leading-[1.08] tracking-normal sm:text-[2.35rem]"
            >
              {title}
            </h2>
            <div className="flex flex-col items-start gap-2.5">
              <span className="text-xs font-medium text-white/85">{logoLabel}</span>
              <img
                src={`${base}assets/${logo}.webp`}
                width={313}
                height={121}
                alt={logoAlt}
                className="h-14 w-auto md:h-20"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </Reveal>

        {/* ---- Tabela (desktop) ---- */}
        <div className="mt-12 hidden md:block">
          <div className="grid grid-cols-[1.7fr_1fr_1.05fr] gap-x-4">
            {/* Coluna 1 — Funcionalidade (conteúdo centralizado; linhas recuadas e mais visíveis) */}
            <Reveal from="up" className="flex flex-col">
              <div className="flex h-20 items-end justify-center pb-4 text-center text-lg font-semibold text-white/90">Funcionalidade</div>
              <ul className="mx-auto max-w-[78%] divide-y divide-white/25">
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
