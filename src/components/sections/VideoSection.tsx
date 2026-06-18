import { video as v } from '../../data/content'
import { PlayIcon } from '../ui/icons'
import { WaveDivider } from '../ui/Dividers'
import { Reveal } from '../ui/Reveal'

export function VideoSection() {
  return (
    <section className="relative bg-surface" aria-labelledby="video-title">
      <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24 md:pb-36">
        <Reveal from="left" blur={4}>
          <h2 id="video-title" className="text-3xl font-extrabold leading-[1.1] text-ink sm:text-[2.7rem]">
            {v.headingLead.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
            <br />
            <span className="text-azure-600">
              {v.headingAccent.split('\n').map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </span>
          </h2>
          <p className="mt-5 text-base font-bold text-muted">
            {v.sub.split('\n').map((line, i, arr) => (
              <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
            ))}
          </p>
        </Reveal>

        <Reveal from="tilt-right" distance={52} blur={6} delay={0.1}>
          <button
            type="button"
            aria-label="Reproduzir vídeo de demonstração do Somno"
            className="card-hover group relative mx-auto grid aspect-[9/16] w-full max-w-[360px] place-items-center overflow-hidden rounded-[1.6rem] border-2 border-azure bg-[#d8dce0] shadow-soft transition-colors hover:border-azure-600 hover:bg-[#cfd3d7] hover:shadow-[0_30px_55px_-22px_rgba(0,69,148,0.5)]"
          >
            {/* anel pulsante chamando atenção para o play */}
            <span className="pulse-ring pointer-events-none absolute h-16 w-16 rounded-full bg-white/60" aria-hidden="true" />
            <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-azure shadow-lg transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
              <PlayIcon className="ml-1 h-7 w-7" />
            </span>
          </button>
        </Reveal>
      </div>

      <WaveDivider fill="#004594" className="absolute inset-x-0 bottom-0 z-[1]" />
    </section>
  )
}
