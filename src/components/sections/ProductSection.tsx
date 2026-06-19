import type { Product } from '../../data/content'
import { OptImg } from '../ui/OptImg'
import { Reveal } from '../ui/Reveal'

const base = import.meta.env.BASE_URL

const alt: Record<string, string> = {
  colchoes: 'Mulher deitada confortavelmente sobre o colchão',
  spring: 'Homem relaxado em uma poltrona usando o notebook',
}

function FeatureCard({ p }: { p: Product }) {
  const cardDark = p.variant === 'navy'
  return (
    <div
      className={`card-hover rounded-[1.5rem] p-7 shadow-2xl hover:shadow-[0_40px_80px_-30px_rgba(0,0,0,0.75)] md:p-9 ${
        cardDark
          ? 'bg-gradient-to-br from-card-dark to-navy-900 text-white'
          : 'bg-charcoal/90 text-white ring-1 ring-white/10 backdrop-blur-md'
      }`}
    >
      <h3 id={`prod-${p.id}`} className="text-3xl font-extrabold leading-tight sm:text-4xl">
        {p.name}
        <br />
        <span className="font-semibold text-white/85">{p.sub}</span>
      </h3>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
        {p.desc.split('\n').map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </p>
      <ul className="mt-6 space-y-3">
        {p.features.map((f) => (
          <li key={f} className="group flex items-center gap-3 text-[0.95rem] transition-transform duration-300 hover:translate-x-1.5">
            <img src={`${base}icons/check-badge.png`} alt="" width={20} height={20} className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-125" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/** Layout "fullbleed": imagem cobre a seção inteira, card flutua por cima */
function FullbleedProduct({ p }: { p: Product }) {
  const cardLeft = p.imageSide === 'right'
  // A imagem do colchão tem a modelo e o logo "Somno — O seu melhor sono" no
  // canto inferior esquerdo; fixamos o recorte nesse canto para que o
  // object-cover nunca corte essa informação (sobra só topo/direita, que são vazios).
  const imgPos = p.id === 'colchoes' ? 'object-left-bottom' : 'object-center'

  return (
    <section
      className="product-fullbleed relative overflow-hidden"
      aria-labelledby={`prod-${p.id}`}
    >
      {/* Imagem de fundo — cobre toda a seção */}
      <div className="absolute inset-0 z-0">
        <OptImg
          name={p.image}
          alt={alt[p.image] ?? p.sub}
          width={1672}
          height={941}
          avif
          srcWidths={[640, 960, 1280]}
          sizes="100vw"
          className={`h-full w-full object-cover ${imgPos}`}
        />
      </div>

      {/* Container do card */}
      <div className={`container-x relative z-10 flex min-h-[680px] items-center py-14 md:min-h-[900px] md:py-20 ${
        cardLeft ? 'justify-start' : 'justify-end'
      }`}>
        <Reveal
          from={cardLeft ? 'tilt-left' : 'tilt-right'}
          distance={28}
          blur={3}
          className={`w-full ${cardLeft ? 'max-w-sm md:max-w-md' : 'max-w-md md:max-w-lg'}`}
        >
          <FeatureCard p={p} />
        </Reveal>
      </div>
    </section>
  )
}

export function ProductSection({ product: p }: { product: Product; tint?: 'white' | 'surface' }) {
  return <FullbleedProduct p={p} />
}
