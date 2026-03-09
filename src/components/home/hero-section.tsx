import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="mt-6 grid gap-6 rounded-3xl bg-[#F0F0F0] p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:p-8">
      <div className="flex flex-col justify-between gap-6">
        <div className="space-y-4">
          <h1 className="text-3xl font-black uppercase tracking-[0.3em] leading-tight md:text-4xl">
            Modern <span className="text-zinc-500">Streetwear</span> for
            Everyday Icons
          </h1>
          <p className="max-w-md text-sm text-zinc-600">
            Heavy silhouettes, monochrome palettes, and clean lines. Built to
            move with you from day to night.
          </p>
          <Button className="mt-2 w-fit rounded-full bg-black px-8 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-zinc-900">
            Shop the collection
          </Button>
        </div>

        <div className="mt-2 flex flex-wrap gap-8 text-xs font-medium text-zinc-700">
          <div>
            <p className="text-xl font-black">4.8</p>
            <p className="text-zinc-500">Average rating</p>
          </div>
          <div>
            <p className="text-xl font-black">25k+</p>
            <p className="text-zinc-500">Customers worldwide</p>
          </div>
          <div>
            <p className="text-xl font-black">48h</p>
            <p className="text-zinc-500">Express shipping</p>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-[20px] bg-[#111111]">
        <img
          src="https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Streetwear hero"
          className="h-full w-full object-cover opacity-90"
        />
      </div>
    </section>
  )
}

