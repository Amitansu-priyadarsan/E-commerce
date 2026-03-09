import heroImage from "@/assets/hero.png"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    // Single white hero background, no extra inner cards
    <section className="w-full bg-white">
      {/* Taller hero container so content has more vertical space */}
      <div className="mx-auto grid max-w-[1440px] min-h-[520px] gap-10 lg:gap-16 py-12 px-4 lg:min-h-[640px] lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:py-16 lg:px-8">
        {/* Left: text content */}
        <div className="flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <h1 className="font-integral max-w-xl uppercase leading-[1.08] tracking-[0.08em] text-[clamp(2.6rem,3.4vw+1.6rem,3.9rem)]">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>

            <p className="font-satoshi max-w-md text-sm leading-relaxed text-zinc-600">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            <Button className="font-satoshi mt-4 inline-flex h-12 w-52 items-center justify-center gap-3 rounded-[62px] bg-black px-14 py-4 text-base font-medium text-white hover:bg-zinc-900">
              Shop Now
            </Button>
          </div>

          {/* Stats row */}
          <div className="font-satoshi mt-8 inline-flex flex-wrap items-center gap-8 text-base text-black/60">
            <div className="inline-flex flex-col items-start justify-start">
              <div className="text-4xl font-bold text-black">200+</div>
              <div className="leading-5">International Brands</div>
            </div>

            <div className="h-20 w-px bg-black/10" />

            <div className="inline-flex flex-col items-start justify-start">
              <div className="text-4xl font-bold text-black">2,000+</div>
              <div className="leading-5">High-Quality Products</div>
            </div>

            <div className="h-20 w-px bg-black/10" />

            <div className="inline-flex flex-col items-start justify-start">
              <div className="text-4xl font-bold text-black">30,000+</div>
              <div className="leading-5">Happy Customers</div>
            </div>
          </div>
        </div>

        {/* Right: model image */}
        <div className="relative flex items-stretch justify-end">
          {/* Image container fills column height and is nudged right */}
          <div className="relative h-full w-full max-w-[560px] translate-x-2 overflow-hidden rounded-[28px] lg:translate-x-6">
            <img
              src={heroImage}
              alt="Fashion models"
              className="h-full w-full object-cover object-right"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

