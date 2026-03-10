import { useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { Check, Settings2, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { products } from "@/data/products"
import { Card } from "@/components/ui/card"
import { QuantitySelector } from "@/components/common/quantity-selector"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ProductSection } from "@/components/home/product-section"
import { useCart } from "@/contexts/cart-context"
import { ReviewCard } from "@/components/common/review-card"

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
      content:
        "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt.",
    },
    {
      name: "Alex M.",
      rating: 4,
      date: "August 15, 2023",
      content:
        "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UX/UI designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
    },
    {
      name: "Ethan R.",
      rating: 3.5,
      date: "August 16, 2023",
      content:
        "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer's touch in every aspect of this shirt.",
    },
    {
      name: "Olivia P.",
      rating: 4.5,
      date: "August 17, 2023",
      content:
        "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It's evident that the designer poured their creativity into making this t-shirt stand out.",
    },
    {
      name: "Liam K.",
      rating: 4,
      date: "August 18, 2023",
      content:
        "This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer's skill. It's like wearing a piece of art that reflects my passion for both design and fashion.",
    },
    {
      name: "Ava H.",
      rating: 4.5,
      date: "August 19, 2023",
      content:
        "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter.",
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
    <div className="space-y-10 py-6 pb-16">
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

      <section className="space-y-6 pt-10">
        <Tabs value={tab} onValueChange={setTab}>
          <div className=" pb-0">
            <TabsList className="flex w-full items-center justify-between gap-0 rounded-none border-transparent bg-transparent p-0 md:justify-around">
              <TabsTrigger
                value="details"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 font-satoshi text-base font-normal text-zinc-500 hover:bg-transparent hover:text-zinc-900",
                  tab === "details" &&
                    "border-black font-medium text-black"
                )}
              >
                Product Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 font-satoshi text-base font-normal text-zinc-500 hover:bg-transparent hover:text-zinc-900",
                  tab === "reviews" &&
                    "border-black font-medium text-black"
                )}
              >
                Rating &amp; Reviews
              </TabsTrigger>
              <TabsTrigger
                value="faqs"
                className={cn(
                  "flex-1 rounded-none border-b-2 border-transparent bg-transparent px-0 pb-4 pt-0 font-satoshi text-base font-normal text-zinc-500 hover:bg-transparent hover:text-zinc-900",
                  tab === "faqs" && "border-black font-medium text-black"
                )}
              >
                FAQs
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="details">
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
          <TabsContent value="reviews" >
            <div className="space-y-8 pt-8 font-satoshi">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-black md:text-2xl">
                    All Reviews
                  </h2>
                  <span className="text-sm text-zinc-500">
                    (451)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F0F0F0] p-0 hover:bg-zinc-200"
                  >
                    <Settings2 className="h-5 w-5 text-black" />
                  </Button>
                  <Button
                    variant="secondary"
                    className="hidden h-12 items-center gap-4 rounded-full bg-[#F0F0F0] px-5 text-base font-medium text-black hover:bg-zinc-200 md:flex"
                  >
                    Latest <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    className="h-12 rounded-full bg-black px-6 text-base font-medium text-white hover:bg-zinc-800"
                  >
                    Write a Review
                  </Button>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {mockReviews.map((review) => (
                  <ReviewCard
                    key={review.name}
                    name={review.name}
                    rating={review.rating}
                    content={review.content}
                    date={review.date}
                    verified
                    showMenu
                  />
                ))}
              </div>

              <div className="flex items-center justify-center pt-4">
                <Button
                  variant="outline"
                  className="h-12 rounded-full border-black/10 px-8 font-satoshi text-base font-medium text-black hover:bg-black hover:text-white"
                >
                  Load More Reviews
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="faqs" >
            <div className="space-y-4 pt-8 font-satoshi text-base text-zinc-600">
              <div className="rounded-[20px] border border-black/10 bg-white p-6 shadow-none">
                <h3 className="text-xl font-bold text-black">
                  What is the return policy?
                </h3>
                <p className="mt-2 text-black/60">
                  You can return unworn items within 30 days of delivery for a
                  full refund. Tags must be attached and original packaging
                  included.
                </p>
              </div>
              <div className="rounded-[20px] border border-black/10 bg-white p-6 shadow-none">
                <h3 className="text-xl font-bold text-black">
                  How long does shipping take?
                </h3>
                <p className="mt-2 text-black/60">
                  Standard shipping typically takes 3–5 business days. Express
                  options are available at checkout.
                </p>
              </div>
              <div className="rounded-[20px] border border-black/10 bg-white p-6 shadow-none">
                <h3 className="text-xl font-bold text-black">
                  How do I find my fit?
                </h3>
                <p className="mt-2 text-black/60">
                  Our fits are generally relaxed/oversized. We recommend sticking to your regular size for an intended loose fit, or sizing down if you prefer a more tailored look. Check the Size & Fit tab for specific dimensions.
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
        <h1 className="font-integral text-3xl font-black uppercase tracking-tighter text-zinc-900 md:text-4xl">
          {name}
        </h1>
        <p className="mt-2 flex items-center gap-2 font-satoshi text-sm text-zinc-600">
          <span className="text-yellow-500">★★★★☆</span>
          <span className="font-medium">{rating.toFixed(1)}/5</span>
          <span className="text-zinc-400">({reviews} reviews)</span>
        </p>
      </div>

      <div className="flex items-end gap-3 font-satoshi">
        <span className="text-3xl font-bold text-zinc-900">${price}</span>
        {originalPrice && (
          <span className="text-xl font-bold text-zinc-400 line-through">
            ${originalPrice}
          </span>
        )}
      </div>

      <p className="font-satoshi text-sm text-zinc-500">
        This graphic t-shirt is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.
      </p>

      <hr className="border-zinc-200" />

      <div className="space-y-6">
        <div className="space-y-4">
          <div className="font-satoshi text-base text-[#000000] opacity-60">
            Select Colors
          </div>
          <div className="flex items-center justify-start gap-3">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onColorChange(c)}
                aria-label={`Color ${c}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border-none p-0 overflow-hidden ring-offset-white focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2"
                style={{ backgroundColor: c }}
              >
                {color === c && (
                  <Check className="h-4 w-4 text-white mix-blend-difference drop-shadow-md" strokeWidth={3} />
                )}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-zinc-200" />

        <div className="space-y-4">
          <div className="font-satoshi text-base text-[#000000] opacity-60">
            Choose Size
          </div>
          <div className="flex flex-wrap items-center justify-start gap-3">
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSizeChange(s)}
                className={`flex h-[46px] items-center justify-center rounded-full px-6 font-satoshi text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:ring-offset-2 ring-offset-white ${size === s
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-black/60 hover:bg-zinc-200 hover:text-black"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <hr className="border-zinc-200" />

        <div className="flex items-center gap-4 pt-4">
          <QuantitySelector value={quantity} onChange={onQuantityChange} />
          <Button
            className="h-14 flex-1 rounded-full bg-black font-satoshi text-base font-medium text-white hover:bg-zinc-800"
            onClick={onAddToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

