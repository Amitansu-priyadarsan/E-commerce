const brands = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"]

export function BrandMarquee() {
  return (
    <section className="mt-8 rounded-3xl bg-black px-4 py-4 text-white">
      <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold uppercase tracking-[0.25em] opacity-80">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center rounded-full border border-white/10 px-6 py-2"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  )
}

