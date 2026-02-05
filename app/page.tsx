import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProjects } from '@/components/home/featured-projects'
import { FeaturedProducts } from '@/components/home/featured-products'
import { AboutSection } from '@/components/home/about-section'
import { CTASection } from '@/components/home/cta-section'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProjects />
        <AboutSection />
        <FeaturedProducts />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
