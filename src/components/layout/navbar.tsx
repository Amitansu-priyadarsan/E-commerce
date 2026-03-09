import { Link, NavLink } from "react-router-dom"
import { ShoppingBag, User, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="border-b border-zinc-200 bg-[#F0F0F0]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 lg:px-0">
        <Link to="/" className="text-xl font-black tracking-[0.2em]">
          SHOP.CO
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-zinc-700 md:flex">
          <NavLink
            to="/category/all"
            className={({ isActive }) =>
              isActive ? "text-black" : "text-zinc-600 hover:text-black"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/category/casual"
            className="text-zinc-600 hover:text-black"
          >
            Casual
          </NavLink>
          <NavLink
            to="/category/formal"
            className="text-zinc-600 hover:text-black"
          >
            Formal
          </NavLink>
          <NavLink
            to="/category/street"
            className="text-zinc-600 hover:text-black"
          >
            Streetwear
          </NavLink>
        </nav>

        <div className="hidden w-64 md:block">
          <Input
            placeholder="Search for products..."
            prefixIcon={<Search className="h-4 w-4" />}
          />
        </div>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="icon"
            variant="ghost"
            className="rounded-full bg-white"
          >
            <Link to="/cart" aria-label="Cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="hidden rounded-full bg-white md:inline-flex"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

