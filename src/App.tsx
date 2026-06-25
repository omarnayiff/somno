import { Hero } from './components/sections/Hero'
import { Stats } from './components/sections/Stats'
import { Comparison } from './components/sections/Comparison'
import { Aplicacoes } from './components/sections/Aplicacoes'
import { VideoSection } from './components/sections/VideoSection'
import { Benefits } from './components/sections/Benefits'
import { LeadForm } from './components/sections/LeadForm'
import { Footer } from './components/sections/Footer'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { comparison2 } from './data/content'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <main>
        <Aplicacoes />
        {/* Os dois comparativos compartilham UM fundo contínuo (sem linha de
            divisão entre eles); por isso as seções ficam transparentes. */}
        <div className="bg-[linear-gradient(180deg,#004594_0%,#063079_50%,#04205f_100%)]">
          <Comparison bgClassName="bg-transparent" />
          <Comparison
            id="comparativo-2"
            data={comparison2}
            bgClassName="bg-transparent"
            image="img-card2"
            imageAlt="Poltrona com a tecnologia Somno Spring"
            title="Somno Spring"
            logo="logo-springflex"
            logoAlt="Springflex"
            logoLabel="Parceiro oficial de conforto:"
          />
        </div>
        <VideoSection />
        <Benefits />
        <Stats />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
