import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { products } from "@/data/products"
import { Card } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { QuantitySelector } from "@/components/common/quantity-selector"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductSection } from "@/components/home/product-section"
import { useCart } from "@/contexts/cart-context"

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)
  const { addItem } = useCart()
  const [color, setColor] = useState<string | undefined>(product?.colors[0])
  const [size, setSize] = useState<string | undefined>(product?.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState("details")

  const recommendations = useMemo(
    () =>
      products
        .filter((p) => p.id !== product?.id && p.category === product?.category)
        .slice(0, 4),
    [product]
  )

  if (!product) {
    return <div className="py-10 text-sm text-zinc-700">Product not found.</div>
  }

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${color}-${size}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      color,
      size,
      quantity,
    })
  }

  return (
    <div className="space-y-10 py-6">
      <section className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <ImageGallery image={product.image} />
        <ProductInfo
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          rating={product.rating}
          reviews={product.reviews}
          colors={product.colors}
          sizes={product.sizes}
          color={color}
          size={size}
          onColorChange={setColor}
          onSizeChange={setSize}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </section>

      <section className="space-y-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Rating & Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="details" activeValue={tab}>
            <p className="mt-2 text-sm text-zinc-600">
              Heavyweight cotton blend with a soft brushed interior. Designed
              for layering with a relaxed, boxy fit and dropped shoulders.
            </p>
          </TabsContent>
          <TabsContent value="reviews" activeValue={tab}>
            <div className="mt-2 text-sm text-zinc-600">
              Reviews coming soon. Be the first to leave one.
            </div>
          </TabsContent>
          <TabsContent value="faqs" activeValue={tab}>
            <div className="mt-2 text-sm text-zinc-600">
              Questions about sizing, shipping, or returns? Reach out to our
              support team any time.
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {recommendations.length > 0 && (
        <ProductSection
          title="You Might Also Like"
          products={recommendations}
        />
      )}
    </div>
  )
}

type ImageGalleryProps = {
  image: string
}

function ImageGallery({ image }: ImageGalleryProps) {
  const thumbs = [image, image, image]

  return (
    <div className="grid gap-4 lg:grid-cols-[80px_minmax(0,1fr)]">
      <div className="flex flex-row gap-3 lg:flex-col">
        {thumbs.map((src, i) => (
          <button
            key={i}
            className="overflow-hidden rounded-2xl bg-[#F0EEED]"
          >
            <img
              src={src}
              alt=""
              className="h-20 w-20 object-cover opacity-90"
            />
          </button>
        ))}
      </div>
      <Card className="overflow-hidden rounded-[20px] border-none bg-[#F0EEED] p-0">
        <div className="aspect-[4/5] w-full">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </Card>
    </div>
  )
}

type ProductInfoProps = {
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  colors: string[]
  sizes: string[]
  color?: string
  size?: string
  onColorChange: (color: string) => void
  onSizeChange: (size: string) => void
  quantity: number
  onQuantityChange: (value: number) => void
  onAddToCart: () => void
}

function ProductInfo({
  name,
  price,
  originalPrice,
  rating,
  reviews,
  colors,
  sizes,
  color,
  size,
  onColorChange,
  onSizeChange,
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductInfoProps) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-black uppercase tracking-[0.25em]">
          {name}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          Rated {rating.toFixed(1)} ({reviews} reviews)
        </p>
      </div>

      <div className="flex items-end gap-3">
        <span className="text-2xl font-black text-zinc-900">${price}</span>
        {originalPrice && (
          <span className="text-sm text-zinc-400 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Color
          </div>
          <ToggleGroup
            type="single"
            value={color}
            onValueChange={(v) => onColorChange(String(v))}
          >
            {colors.map((c) => (
              <ToggleGroupItem
                key={c}
                value={c}
                className="h-8 w-8 rounded-full border border-zinc-200 p-0"
              >
                <span
                  className="block h-6 w-6 rounded-full"
                  style={{ backgroundColor: c }}
                />
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div>
          <div className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Size
          </div>
          <ToggleGroup
            type="single"
            value={size}
            onValueChange={(v) => onSizeChange(String(v))}
          >
            {sizes.map((s) => (
              <ToggleGroupItem key={s} value={s}>
                {s}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <QuantitySelector value={quantity} onChange={onQuantityChange} />
          <Button
            className="flex-1 rounded-full bg-black text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-zinc-900"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

