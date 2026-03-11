import heroImage from "@/assets/Hero/Hero1.png"

export function HeroSection() {
  return (
    <section className="w-full">
      <img
        src={heroImage}
        alt="Hero Fashion"
        className="h-[250px] sm:h-[700px] md:h-[800px] w-full object-cover object-center"
      />
    </section>
  )
}

