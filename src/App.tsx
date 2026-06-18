import { Hero } from './components/sections/Hero'
import { Stats } from './components/sections/Stats'
import { Comparison } from './components/sections/Comparison'
import { ProductSection } from './components/sections/ProductSection'
import { Aplicacoes } from './components/sections/Aplicacoes'
import { VideoSection } from './components/sections/VideoSection'
import { Benefits } from './components/sections/Benefits'
import { LeadForm } from './components/sections/LeadForm'
import { Footer } from './components/sections/Footer'
import { products } from './data/content'

export default function App() {
  return (
    <>
      <Hero />
      <main>
        <Stats />
        <Comparison />
        <ProductSection product={products[0]} tint="white" />
        <ProductSection product={products[1]} tint="surface" />
        <Aplicacoes />
        <VideoSection />
        <Benefits />
        <LeadForm />
      </main>
      <Footer />
    </>
  )
}
