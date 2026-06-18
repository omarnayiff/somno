import { applications as a } from '../../data/content'
import { OptImg } from '../ui/OptImg'
import { CtaButton } from '../ui/CtaButton'
import { Reveal } from '../ui/Reveal'
import { Aurora } from '../ui/Aurora'

// Onda de entrada: cada card surge de um ângulo diferente.
const itemDirs = ['zoom', 'up', 'tilt-left', 'tilt-right', 'down'] as const

export function Aplicacoes() {
  return (
    <section
      id="aplicacoes"
      className="relative isolate overflow-hidden bg-navy text-white"
      aria-labelledby="aplic-title"
    >
      <Aurora />
      <div className="container-x relative z-10 py-16 md:py-20">
        <Reveal from="down" blur={4}>
          <h2 id="aplic-title" className="text-center text-3xl font-extrabold sm:text-4xl">
            {a.heading}
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.label} from={itemDirs[i % itemDirs.length]} delay={i * 0.05}>
              <figure className="card-hover group h-full overflow-hidden rounded-2xl bg-navy p-2.5 shadow-soft ring-1 ring-white hover:shadow-[0_30px_55px_-22px_rgba(0,0,0,0.6)] hover:ring-azure">
                <div className="overflow-hidden rounded-xl">
                  <OptImg
                    name={it.image}
                    alt={`Aplicação Somno em ${it.label.toLowerCase()}`}
                    width={640}
                    height={480}
                    sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 45vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                  />
                </div>
                <figcaption className="py-3 text-center text-sm font-medium text-white transition-colors duration-300 group-hover:text-azure">{it.label}</figcaption>
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
