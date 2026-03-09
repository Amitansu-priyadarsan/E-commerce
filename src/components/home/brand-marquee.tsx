const brands = ["Versace", "Zara", "Gucci", "Prada", "Calvin Klein"]

export function BrandMarquee() {
  return (
    // Full-bleed black strip (ignores page horizontal padding)
    <section className="mt-8 w-screen relative left-1/2 right-1/2 -mx-[50vw]">
      <div className="flex h-[122px] w-full items-center justify-center bg-black">
        <div className="flex items-center justify-center gap-24">
          {brands.map((brand) => (
            <span
              key={brand}
              className="font-serif text-[20px] font-semibold tracking-[0.5em] text-white uppercase"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

