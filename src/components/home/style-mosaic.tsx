import { Card } from "@/components/ui/card"

export function StyleMosaic() {
  return (
    <section className="mt-16">
      <div className="mx-auto max-w-6xl rounded-[40px] bg-[#F0F0F0] px-6 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14">
        <h2 className="text-center text-2xl font-black uppercase tracking-tight text-black md:text-4xl lg:text-5xl">
          BROWSE BY <span className="uppercase">DRESS</span> STYLE
        </h2>

        <div className="mt-10 grid gap-4 md:grid-cols-12 md:auto-rows-[minmax(220px,1fr)] lg:gap-6">
          {/* Casual - top left (smaller card) */}
          <StyleCard
            title="Casual"
            imageUrl="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80"
            className="md:col-span-4"
          />

          {/* Formal - top right (wide card) */}
          <StyleCard
            title="Formal"
            imageUrl="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
            className="md:col-span-8"
          />

          {/* Party - bottom left (wide card) */}
          <StyleCard
            title="Party"
            imageUrl="https://images.unsplash.com/photo-1543087903-1ac2ec7aa8c5?auto=format&fit=crop&w=1600&q=80"
            className="md:col-span-8 md:mt-2"
          />

          {/* Gym - bottom right (smaller card) */}
          <StyleCard
  title="Gym"
  imageUrl="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
  className="md:col-span-4 md:mt-2"
/>
        </div>
      </div>
    </section>
  )
}

type StyleCardProps = {
  title: string
  imageUrl: string
  className?: string
}

function StyleCard({ title, imageUrl, className }: StyleCardProps) {
  return (
    <Card
      className={`flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-sm ${className ?? ""}`}
    >
      <div>
        <h3 className="text-2xl font-semibold tracking-tight text-black md:text-3xl">
          {title}
        </h3>
      </div>
      <div className="mt-5 h-32 overflow-hidden rounded-2xl bg-[#F0F0F0] md:h-40 lg:h-48">
        <img
          src={imageUrl}
          alt={`${title} style`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </Card>
  )
}

