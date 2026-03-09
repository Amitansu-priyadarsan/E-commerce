import { HeroSection } from "@/components/home/hero-section"
import { BrandMarquee } from "@/components/home/brand-marquee"
import { ProductSection } from "@/components/home/product-section"
import { StyleMosaic } from "@/components/home/style-mosaic"
import { ReviewCarousel } from "@/components/home/review-carousel"
import { products } from "@/data/products"

export function HomePage() {
  const newArrivals = products.slice(0, 4)
  const topSelling = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <div className="space-y-10 pb-10">
      <HeroSection />
      <BrandMarquee />
      <ProductSection
        title="New Arrivals"
        subtitle="Fresh silhouettes and fabrics, just dropped."
        products={newArrivals}
      />
      <div className="mx-auto w-full max-w-[1440px] border-b border-black/10" />
      <ProductSection
        title="Top Selling"
        subtitle="The pieces everyone keeps coming back for."
        products={topSelling}
      />
      {/* Divider between New Arrivals and Top Selling */}
      <StyleMosaic />
      <ReviewCarousel />
    </div>
  )
}

