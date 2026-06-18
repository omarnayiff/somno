import { benefits as b } from '../../data/content'
import { PngIcon } from '../ui/icons'
import { Reveal } from '../ui/Reveal'

export function Benefits() {
  return (
    <section className="bg-navy text-white" aria-labelledby="benefits-title">
      <div className="container-x py-14 md:py-20">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 id="benefits-title" className="text-3xl font-extrabold leading-[1.12] sm:text-[2.6rem]">
            <span className="text-azure">{b.headingAccent}</span>{' '}
            <span className="text-white">{b.headingRest}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 rounded-2xl border border-azure/40 p-3">
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {b.items.map((it, i) => (
                <li
                  key={it.title}
                  className="rounded-xl bg-azure p-6"
                >
                  <PngIcon name={it.icon} className="h-10 w-10" />
                  <h3 className="mt-5 text-lg font-bold leading-snug">{it.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/90">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
