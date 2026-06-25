import { applications as a } from '../../data/content'
import { OptImg } from '../ui/OptImg'
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
        <Reveal from="down">
          <h2
            id="aplic-title"
            className="mx-auto whitespace-nowrap text-center font-semibold tracking-tight text-[clamp(0.74rem,3.2vw,2.5rem)]"
          >
            {a.headingLead}
            <span className="text-azure">{a.headingAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-white/80 sm:text-lg">
            {a.sub}
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {a.items.map((it, i) => (
            <Reveal as="li" key={it.label} from={itemDirs[i % itemDirs.length]} delay={i * 0.04}>
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
      </div>
    </section>
  )
}
