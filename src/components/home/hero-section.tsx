import heroImage from "@/assets/Hero/Hero1.png"

export function HeroSection() {
  return (
    <section className="w-full">
      <img
        src={heroImage}
        alt="Hero Fashion"
        className="h-[709px] w-full object-cover"
      />
    </section>
  )
}

