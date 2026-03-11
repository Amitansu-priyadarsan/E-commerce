import { HeroSection } from "@/components/home/hero-section"
import { BrandMarquee } from "@/components/home/brand-marquee"
import { ReviewCarousel } from "@/components/home/review-carousel"
import { CarnivalSection } from "@/components/home/carnival-section"

export function HomePage() {
  return (
    <div className="space-y-10 pb-36">
      <HeroSection />
      <BrandMarquee />
      <CarnivalSection />
      <ReviewCarousel />
    </div>
  )
}

