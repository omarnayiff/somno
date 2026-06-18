import { applications as a } from '../../data/content'
import { OptImg } from '../ui/OptImg'
import { CtaButton } from '../ui/CtaButton'
import { Reveal } from '../ui/Reveal'

export function Aplicacoes() {
  return (
    <section id="aplicacoes" className="bg-navy text-white" aria-labelledby="aplic-title">
      <div className="container-x py-16 md:py-20">
        <Reveal>
          <h2 id="aplic-title" className="text-center text-3xl font-extrabold sm:text-4xl">
            {a.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.label} delay={i * 0.06}>
              <figure className="h-full overflow-hidden rounded-2xl bg-navy p-2.5 shadow-soft ring-1 ring-white">
                <OptImg
                  name={it.image}
                  alt={`Aplicação Somno em ${it.label.toLowerCase()}`}
                  width={640}
                  height={480}
                  sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 45vw"
                  className="aspect-[4/3] w-full rounded-xl object-cover"
                />
                <figcaption className="py-3 text-center text-sm font-medium text-white">{it.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <CtaButton label={a.cta} />
        </div>
      </div>
    </section>
  )
}
