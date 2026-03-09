import type { Product } from "@/data/products"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"

type ProductSectionProps = {
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  return (
    <section className="space-y-6 py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black uppercase tracking-[0.25em]">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-sm text-zinc-600">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          className="rounded-full border-zinc-300 bg-[#F0F0F0] px-8 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-900 hover:bg-white"
        >
          View all
        </Button>
      </div>
    </section>
  )
}

