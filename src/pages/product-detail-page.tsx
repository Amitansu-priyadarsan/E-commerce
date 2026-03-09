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

  const mockReviews = [
    {
      name: "Samantha D.",
      rating: 4.5,
      date: "August 14, 2023",
      title: "My new go-to tee",
      content:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail.",
    },
    {
      name: "Alex M.",
      rating: 5,
      date: "August 15, 2023",
      title: "Exceeded my expectations",
      content:
        "The colors are vibrant and the print quality is top-notch. I'm quite picky about fit, and this definitely gets a thumbs up from me.",
    },
  ]

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
      <section className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
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

      <section className="space-y-6">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="w-full justify-start gap-10 rounded-none border-b bg-transparent px-0 pb-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-zinc-500 data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900"
            >
              Product Details
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-zinc-500 data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900"
            >
              Rating &amp; Reviews
            </TabsTrigger>
            <TabsTrigger
              value="faqs"
              className="rounded-none border-b-2 border-transparent px-0 pb-3 text-sm font-medium text-zinc-500 data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900"
            >
              FAQs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="details" activeValue={tab}>
            <div className="grid gap-6 pt-6 md:grid-cols-2">
              <div className="space-y-3 text-sm text-zinc-600">
                <p>
                  This graphic t-shirt is perfect for any occasion. Crafted from
                  a soft and breathable cotton blend, it offers superior comfort
                  and all-day wearability.
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Relaxed fit with dropped shoulders</li>
                  <li>Heavyweight 240 GSM fabric for a premium feel</li>
                  <li>Durable print that resists fading</li>
                  <li>Machine washable and easy to care for</li>
                </ul>
              </div>
              <div className="space-y-2 rounded-2xl bg-zinc-50 p-5 text-sm text-zinc-600">
                <h3 className="text-sm font-semibold text-zinc-900">
                  Size &amp; Fit
                </h3>
                <p>Model is 6'1&quot; and wears a size Large.</p>
                <p>Fits true to size. For an oversized look, size up.</p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" activeValue={tab}>
            <div className="space-y-6 pt-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Rating
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-semibold text-zinc-900">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-zinc-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-zinc-300 px-5 text-xs font-medium"
                >
                  Write a Review
                </Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {mockReviews.map((review) => (
                  <Card
                    key={review.name}
                    className="space-y-3 rounded-2xl border-zinc-100 p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">
                          {review.name}
                        </p>
                        <p className="text-xs text-zinc-500">
                          Posted on {review.date}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-zinc-900">
                        ★★★★☆
                      </div>
                    </div>
                    <p className="text-sm font-medium text-zinc-900">
                      {review.title}
                    </p>
                    <p className="text-sm text-zinc-600">{review.content}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="faqs" activeValue={tab}>
            <div className="space-y-4 pt-6 text-sm text-zinc-600">
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                <h3 className="text-sm font-semibold text-zinc-900">
                  What is the return policy?
                </h3>
                <p className="mt-1">
                  You can return unworn items within 30 days of delivery for a
                  full refund. Tags must be attached and original packaging
                  included.
                </p>
              </div>
              <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                <h3 className="text-sm font-semibold text-zinc-900">
                  How long does shipping take?
                </h3>
                <p className="mt-1">
                  Standard shipping typically takes 3–5 business days. Express
                  options are available at checkout.
                </p>
              </div>
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 md:text-3xl">
          {name}
        </h1>
        <p className="mt-2 flex items-center gap-2 text-sm text-zinc-600">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="font-medium">{rating.toFixed(1)}/5</span>
          <span className="text-zinc-400">({reviews} reviews)</span>
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

