import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Settings2, ShoppingCart, Heart, SlidersHorizontal, X } from "lucide-react"
import { products } from "@/data/products"
import { useCart } from "@/contexts/cart-context"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { PriceSlider } from "@/components/ui/slider"
import { Select } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"
import { Star } from "lucide-react"

const COLORS = [
  { hex: "#8B0000", label: "Deep Red" },
  { hex: "#1E3A5F", label: "Navy Blue" },
  { hex: "#2D5016", label: "Forest Green" },
  { hex: "#FFD700", label: "Golden" },
  { hex: "#FF69B4", label: "Pink" },
  { hex: "#9B59B6", label: "Purple" },
  { hex: "#008080", label: "Teal" },
  { hex: "#FF6B35", label: "Orange" },
  { hex: "#111111", label: "Black" },
  { hex: "#C0392B", label: "Red" },
]

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"]

const CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "kurtis", label: "Kurtis" },
  { value: "saree", label: "Sarees" },
  { value: "lehenga", label: "Lehengas" },
  { value: "salwar", label: "Salwar Suits" },
  { value: "anarkali", label: "Anarkalis" },
  { value: "pashtuni", label: "Pashtuni Poshak" },
]

type SortKey = "popular" | "price-low" | "price-high" | "rating"

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { addItem } = useCart()
  const [sortKey, setSortKey] = useState<SortKey>("popular")
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [addedToCart, setAddedToCart] = useState<string | null>(null)

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleAddToCart = (e: React.MouseEvent, product: typeof products[0]) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      quantity: 1,
    })
    setAddedToCart(product.id)
    setTimeout(() => setAddedToCart(null), 1500)
  }

  // Filter products
  let filtered = products.filter((p) => {
    // Category filter: if slug is "all", show everything; otherwise filter by slug
    const matchSlug = slug === "all" || p.category === slug
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
    const matchColor =
      selectedColors.length === 0 || selectedColors.some((c) => p.colors.includes(c))
    const matchSize =
      selectedSizes.length === 0 || selectedSizes.some((s) => p.sizes.includes(s))
    return matchSlug && matchPrice && matchColor && matchSize
  })

  // Apply sort
  if (sortKey === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sortKey === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sortKey === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)

  const categoryLabel =
    CATEGORIES.find((c) => c.value === slug)?.label ?? "All Products"

  const FilterPanel = () => (
    <div className="space-y-1">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-800">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h2>
        {(selectedColors.length > 0 || selectedSizes.length > 0) && (
          <button
            onClick={() => { setSelectedColors([]); setSelectedSizes([]) }}
            className="text-[11px] font-medium text-red-500 hover:text-red-700 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <Accordion defaultValue="category">
        <AccordionItem value="category">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  to={`/category/${cat.value}`}
                  className={`flex items-center gap-2 text-sm transition-colors ${slug === cat.value
                    ? "font-semibold text-zinc-900"
                    : "text-zinc-500 hover:text-zinc-800"
                    }`}
                >
                  {slug === cat.value && (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-zinc-900" />
                  )}
                  {cat.label}
                </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <PriceSlider min={0} max={20000} values={priceRange} onChange={setPriceRange} />
            <div className="mt-3 flex justify-between text-xs font-medium text-zinc-700">
              <span>₹{priceRange[0].toLocaleString("en-IN")}</span>
              <span>₹{priceRange[1].toLocaleString("en-IN")}</span>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger>Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2.5">
              {COLORS.map((color) => (
                <button
                  key={color.hex}
                  title={color.label}
                  onClick={() =>
                    setSelectedColors((prev) =>
                      prev.includes(color.hex)
                        ? prev.filter((c) => c !== color.hex)
                        : [...prev, color.hex]
                    )
                  }
                  className={`h-8 w-8 rounded-full border-[2.5px] transition-all duration-200 ${selectedColors.includes(color.hex)
                    ? "border-zinc-900 scale-110 shadow-lg"
                    : "border-zinc-200 hover:border-zinc-400 hover:scale-105"
                    }`}
                  style={{ backgroundColor: color.hex }}
                  aria-label={color.label}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger>Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setSelectedSizes((prev) =>
                      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
                    )
                  }
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium transition-all ${selectedSizes.includes(size)
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-200 text-zinc-600 hover:border-zinc-400"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )

  return (
    // Negative margin to break out of layout's px-4 sm:px-8 padding
    <div className="-mx-4 -mt-6 sm:-mx-8 min-h-screen bg-white">


      <div className="px-6 py-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex gap-10">

            {/* ── Desktop Sidebar ──────────────────────────────── */}
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-24 rounded-2xl bg-white p-6 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <FilterPanel />
              </div>
            </aside>

            {/* ── Mobile Sidebar Drawer ────────────────────────── */}
            {mobileSidebarOpen && (
              <div className="fixed inset-0 z-50 lg:hidden">
                <div
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                  onClick={() => setMobileSidebarOpen(false)}
                />
                <div className="absolute left-0 top-0 h-full w-[300px] overflow-y-auto bg-white p-6 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-semibold text-zinc-900">Filters</span>
                    <button
                      onClick={() => setMobileSidebarOpen(false)}
                      className="rounded-full bg-zinc-100 p-1.5"
                      aria-label="Close filters"
                    >
                      <X className="h-4 w-4 text-zinc-600" />
                    </button>
                  </div>
                  <FilterPanel />
                </div>
              </div>
            )}

            {/* ── Product Grid ────────────────────────────────── */}
            <section className="flex-1 min-w-0 space-y-6 lg:min-h-[700px]">

              {/* Breadcrumb + Page Title (Now inside column) */}
              <div className="mb-2">
                <nav className="mb-1.5 text-xs text-zinc-400">
                  <Link to="/" className="hover:text-zinc-700 transition-colors">Home</Link>
                  <span className="mx-2">/</span>
                  <span className="font-medium text-zinc-800">{categoryLabel}</span>
                </nav>
                <div className="flex items-end justify-between">
                  <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">{categoryLabel}</h1>

                  </div>
                  {/* Mobile filter toggle */}
                  <button
                    onClick={() => setMobileSidebarOpen(true)}
                    className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-[0_2px_10px_rgb(0,0,0,0.03)] lg:hidden"
                  >
                    <Settings2 className="h-3.5 w-3.5" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Sort Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white px-5 py-3 border border-zinc-100">
                <p className="text-sm text-zinc-600">
                  Showing <span className="font-semibold text-zinc-900">{filtered.length}</span> products
                </p>
                <Select
                  defaultValue="popular"
                  onChange={(e) => setSortKey(e.target.value as SortKey)}
                >
                  <option value="popular">Sort: Most Popular</option>
                  <option value="rating">Sort: Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </Select>
              </div>

              {/* Empty State */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-28 text-center">
                  <div className="text-6xl mb-4">🪷</div>
                  <p className="text-lg font-semibold text-zinc-700">No products found</p>
                  <p className="mt-1 text-sm text-zinc-400">Try adjusting or clearing your filters</p>
                </div>
              ) : (
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                  {filtered.map((product) => {
                    const discount =
                      product.originalPrice && product.originalPrice > product.price
                        ? Math.round(
                          ((product.originalPrice - product.price) / product.originalPrice) * 100
                        )
                        : null
                    const isInCart = addedToCart === product.id

                    return (
                      <div
                        key={product.id}
                        className="group relative flex flex-col rounded-2xl bg-transparent transition-all duration-300 border border-transparent hover:border-zinc-100"
                      >
                        {/* Product Image */}
                        <Link
                          to={`/product/${product.id}`}
                          className="relative block overflow-hidden rounded-t-2xl bg-white"
                          style={{ height: "300px" }}
                        >
                          <img
                            src={typeof product.image === "string" ? product.image : product.image}
                            alt={product.name}
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement
                              t.src = `https://placehold.co/400x560/F5F0EA/9B7B5E?text=${encodeURIComponent(product.name)}`
                            }}
                          />

                          {/* Badges */}
                          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                            {product.tags?.includes("new") && (
                              <span className="rounded-full bg-zinc-900 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                                New
                              </span>
                            )}
                            {discount && (
                              <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white shadow">
                                -{discount}%
                              </span>
                            )}
                          </div>

                          {/* Wishlist */}
                          <button
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              toggleWishlist(product.id)
                            }}
                            className={`absolute right-3 top-3 rounded-full p-2 backdrop-blur-sm transition-all duration-200 hover:scale-110 ${wishlist.has(product.id)
                              ? "bg-red-50 opacity-100"
                              : "bg-white/80 opacity-0 group-hover:opacity-100"
                              }`}
                            aria-label="Wishlist"
                          >
                            <Heart
                              className={`h-4 w-4 transition-colors ${wishlist.has(product.id)
                                ? "fill-red-500 text-red-500"
                                : "text-zinc-500"
                                }`}
                            />
                          </button>

                        </Link>

                        {/* Product Info */}
                        <div className="flex flex-col gap-1.5 p-3.5">
                          <Link
                            to={`/product/${product.id}`}
                            className="line-clamp-2 text-[13px] font-semibold leading-snug text-zinc-900 hover:underline"
                          >
                            {product.name}
                          </Link>

                          {/* Rating */}
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < Math.round(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-zinc-200 fill-zinc-200"
                                  }`}
                              />
                            ))}
                            <span className="ml-1 text-[11px] font-semibold text-zinc-700">
                              {product.rating.toFixed(1)}
                            </span>
                            <span className="text-[11px] text-zinc-400">
                              ({product.reviews})
                            </span>
                          </div>

                          {/* Price & Cart */}
                          <div className="flex items-center justify-between gap-2 pt-1">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="text-[15px] font-bold text-zinc-900">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                                {discount && (
                                  <span className="text-[10px] font-bold text-red-500">
                                    -{discount}%
                                  </span>
                                )}
                              </div>
                              {product.originalPrice && (
                                <span className="text-[11px] text-zinc-400 line-through">
                                  ₹{product.originalPrice.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>

                            <button
                              onClick={(e) => handleAddToCart(e, product)}
                              className={`flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 ${isInCart
                                ? "bg-green-600 text-white"
                                : "bg-zinc-100 text-zinc-900 hover:bg-zinc-900 hover:text-white"
                                }`}
                              title="Add to Cart"
                            >
                              <ShoppingCart className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Color swatches */}
                          <div className="flex gap-1.5 pt-1">
                            {product.colors.slice(0, 5).map((color) => (
                              <span
                                key={color}
                                className="h-3.5 w-3.5 rounded-full border border-zinc-200/50"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <Pagination page={1} totalPages={Math.max(1, Math.ceil(filtered.length / 12))} />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
