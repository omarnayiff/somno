import { useState } from 'react'
import { leadForm as f } from '../../data/content'
import { Reveal } from '../ui/Reveal'

export function LeadForm() {
  const [sent, setSent] = useState(false)

  return (
    <section id="contato" className="bg-azure text-white" aria-labelledby="form-title">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24">
        <Reveal from="left" blur={4}>
          <h2 id="form-title" className="text-4xl font-extrabold leading-[1.1] sm:text-5xl">
            Garanta agora<br />
            sua <span className="text-navy">condição</span><br />
            <span className="text-navy">exclusiva</span> de<br />
            lançamento.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/90">
            Nossa equipe entra em contato<br />
            direto com uma proposta para o<br />
            seu produto. Vagas limitadas.
          </p>
          <p className="mt-6 text-sm text-white/85">{f.note}</p>
        </Reveal>

        <Reveal from="right" delay={0.1}>
          {sent ? (
            <div
              role="status"
              className="grid h-full place-items-center rounded-2xl bg-white/15 p-10 text-center ring-1 ring-white/30"
            >
              <div>
                <p className="text-2xl font-bold">Recebemos seus dados! ✓</p>
                <p className="mt-3 text-white/90">Nossa equipe entra em contato em até 24h.</p>
              </div>
            </div>
          ) : (
            <form className="space-y-3.5" onSubmit={(e) => { e.preventDefault(); setSent(true) }} noValidate>
              {f.fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="sr-only">
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={field.label}
                    autoComplete={field.autoComplete}
                    required={field.name !== 'segmento'}
                    className="w-full rounded-xl bg-white px-5 py-4 text-ink shadow-sm outline-none ring-2 ring-transparent transition duration-300 placeholder:text-muted/70 hover:ring-navy/25 focus:-translate-y-0.5 focus:shadow-md focus:ring-navy"
                  />
                </div>
              ))}
              <button
                type="submit"
                className="btn-shine mt-1 w-full rounded-xl bg-navy px-6 py-4 text-base font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-800 hover:shadow-xl active:translate-y-0 active:scale-[0.99]"
              >
                {f.submit}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
