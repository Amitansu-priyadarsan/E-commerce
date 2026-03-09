import { Trash2, ArrowRight } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Card } from "@/components/ui/card"
import { QuantitySelector } from "@/components/common/quantity-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart()

  const discount = subtotal > 200 ? subtotal * 0.1 : 0
  const delivery = subtotal > 0 ? 8 : 0
  const total = subtotal - discount + delivery

  return (
    <div className="grid gap-8 py-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.9fr)]">
      <section className="space-y-4">
        <h1 className="text-xl font-black uppercase tracking-[0.25em]">
          Cart
        </h1>
        {items.length === 0 ? (
          <p className="text-sm text-zinc-600">
            Your cart is empty. Start building your fit from the homepage.
          </p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <Card
                key={item.id}
                className="flex items-center gap-4 rounded-3xl bg-white p-4"
              >
                <div className="h-20 w-20 overflow-hidden rounded-2xl bg-[#F0EEED]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1 text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-zinc-900">
                        {item.name}
                      </div>
                      <div className="mt-1 text-xs text-zinc-500">
                        {item.color && <span>Color: {item.color} · </span>}
                        {item.size && <span>Size: {item.size}</span>}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="rounded-full bg-[#F0F0F0] p-1 text-zinc-500 hover:text-zinc-800"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(value) => updateQuantity(item.id, value)}
                    />
                    <div className="text-sm font-semibold text-zinc-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <aside className="space-y-4">
        <Card className="sticky top-20 space-y-4 rounded-3xl bg-white p-5">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-700">
            Order Summary
          </h2>
          <div className="space-y-2 text-sm">
            <LineItem label="Subtotal" value={subtotal} />
            <LineItem
              label="Discount"
              value={-discount}
              classNameValue="text-red-500"
            />
            <LineItem label="Delivery" value={delivery} />
            <div className="mt-3 border-t border-zinc-200 pt-3">
              <LineItem
                label="Total"
                value={total}
                className="font-semibold"
                classNameValue="font-semibold"
              />
            </div>
          </div>

          <form
            className="mt-3 flex items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              placeholder="Promo code"
              className="h-9 rounded-full bg-[#F0F0F0] text-xs"
            />
            <Button
              type="submit"
              size="sm"
              className="rounded-full bg-black px-4 text-xs font-semibold uppercase tracking-[0.18em] text-white"
            >
              Apply
            </Button>
          </form>

          <Button
            className="mt-4 w-full rounded-full bg-black text-xs font-semibold uppercase tracking-[0.18em] text-white hover:bg-zinc-900"
            disabled={items.length === 0}
          >
            Checkout
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Card>
      </aside>
    </div>
  )
}

type LineItemProps = {
  label: string
  value: number
  className?: string
  classNameValue?: string
}

function LineItem({ label, value, className, classNameValue }: LineItemProps) {
  return (
    <div className={`flex items-center justify-between ${className ?? ""}`}>
      <span className="text-xs text-zinc-500">{label}</span>
      <span className={`text-sm text-zinc-900 ${classNameValue ?? ""}`}>
        ${value.toFixed(2)}
      </span>
    </div>
  )
}

