import { Link } from "react-router-dom"
import { Star } from "lucide-react"
import type { Product } from "@/data/products"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null

  return (
    <Card className="group flex flex-col gap-3 rounded-3xl border-none bg-white p-4 shadow-sm">
      <Link
        to={`/product/${product.id}`}
        className="block overflow-hidden rounded-3xl bg-[#F0EEED]"
      >
        <div className="relative aspect-square w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-1">
        <Link
          to={`/product/${product.id}`}
          className="text-sm font-semibold tracking-tight text-zinc-900 hover:underline"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-1 text-xs text-zinc-500">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3 w-3 ${
                i < Math.round(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-zinc-300"
              }`}
            />
          ))}
          <span className="ml-1 font-medium text-zinc-800">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-zinc-400">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <span className="text-base font-semibold text-zinc-900">
            ${product.price}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-zinc-400 line-through">
                ${product.originalPrice}
              </span>
              {discount && (
                <Badge className="bg-[#F0F0F0] text-[11px] font-semibold text-red-500">
                  -{discount}%
                </Badge>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

