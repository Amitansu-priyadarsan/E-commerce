import { useParams } from "react-router-dom"
import { Settings2 } from "lucide-react"
import { products } from "@/data/products"
import { ProductCard } from "@/components/home/product-card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { PriceSlider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select } from "@/components/ui/select"
import { Pagination } from "@/components/ui/pagination"

const COLORS = ["#111111", "#F0F0F0", "#9CA3AF", "#4B5563"]
const SIZES = ["XS", "S", "M", "L", "XL"]

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()

  const filtered = products.filter((p) =>
    slug === "all" ? true : p.category === (slug as any)
  )

  return (
    <div className="grid gap-8 py-6 lg:grid-cols-[260px_minmax(0,1fr)]">
      <aside className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700">
            Filters
          </h2>
          <Settings2 className="h-4 w-4 text-zinc-500" />
        </div>

        <Accordion defaultValue="category">
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 text-sm text-zinc-700">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="h-3 w-3 rounded border-zinc-300" />
                  All
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-3 w-3 rounded border-zinc-300" />
                  Casual
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-3 w-3 rounded border-zinc-300" />
                  Formal
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="h-3 w-3 rounded border-zinc-300" />
                  Streetwear
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <PriceSlider min={0} max={250} values={[40, 180]} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
              <ToggleGroup type="single">
                {COLORS.map((color) => (
                  <ToggleGroupItem
                    key={color}
                    value={color}
                    className="h-7 w-7 rounded-full border border-zinc-200 p-0"
                  >
                    <span
                      className="block h-5 w-5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              <ToggleGroup type="multiple">
                {SIZES.map((size) => (
                  <ToggleGroupItem key={size} value={size}>
                    {size}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </aside>

      <section className="space-y-4">
        <nav className="text-xs text-zinc-500">
          Home <span className="mx-1">/</span>
          <span className="text-zinc-800 capitalize">{slug}</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-600">
            Showing <span className="font-semibold">1–{filtered.length}</span> of{" "}
            <span className="font-semibold">{filtered.length}</span> products
          </p>
          <Select defaultValue="popular">
            <option value="popular">Sort by: Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination page={1} totalPages={3} />
      </section>
    </div>
  )
}

