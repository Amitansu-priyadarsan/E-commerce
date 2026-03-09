import type { Product } from "@/data/products"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

type ProductSectionProps = {
  title: string
  subtitle?: string
  products: Product[]
}

export function ProductSection({ title, subtitle, products }: ProductSectionProps) {
  const navigate = useNavigate()

  const handleViewAll = () => {
    // Send user to the main product grid; adjust slug if you add more categories
    navigate("/category/all")
  }

  return (
    <section className="space-y-8 py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="font-integral text-center text-5xl font-bold uppercase text-black">
          {title.toUpperCase()}
        </h2>
        {subtitle && (
          <p className="font-satoshi max-w-xl text-center text-sm text-zinc-600">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <Button
          variant="outline"
          onClick={handleViewAll}
          className="font-satoshi inline-flex h-12 w-56 items-center justify-center gap-3 rounded-[62px] border-black/10 bg-white px-14 py-4 text-base font-medium text-black hover:bg-zinc-50"
        >
          View All
        </Button>
      </div>
    </section>
  )
}

