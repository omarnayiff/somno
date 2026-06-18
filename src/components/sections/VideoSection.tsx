import { video as v } from '../../data/content'
import { PlayIcon } from '../ui/icons'
import { WaveDivider } from '../ui/Dividers'
import { Reveal } from '../ui/Reveal'

export function VideoSection() {
  return (
    <section className="relative bg-surface" aria-labelledby="video-title">
      <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-24 md:pb-36">
        <Reveal>
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

        <Reveal delay={0.1}>
          <button
            type="button"
            aria-label="Reproduzir vídeo de demonstração do Somno"
            className="group relative mx-auto grid aspect-[9/16] w-full max-w-[360px] place-items-center rounded-[1.6rem] border-2 border-azure bg-[#d8dce0] shadow-soft transition hover:bg-[#cfd3d7]"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-azure shadow-lg transition-transform duration-200 group-hover:scale-110">
              <PlayIcon className="ml-1 h-7 w-7" />
            </span>
          </button>
        </Reveal>
      </div>

      <WaveDivider fill="#004594" className="absolute inset-x-0 bottom-0 z-[1]" />
    </section>
  )
}
