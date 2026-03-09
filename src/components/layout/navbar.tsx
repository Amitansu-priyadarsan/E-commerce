import { Link, NavLink } from "react-router-dom"
import { ShoppingBag, User, Search, ChevronDown } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function Navbar() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-[1240px] items-center gap-10 px-4 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-[32px] font-black tracking-[0.25em] text-black"
        >
          SHOP.CO
        </Link>

        {/* Primary navigation */}
        <nav className="hidden items-center gap-6 text-base text-black md:flex">
          <div className="flex items-center gap-1">
            <NavLink
              to="/category/all"
              className={({ isActive }) =>
                isActive
                  ? "font-medium text-black"
                  : "font-normal text-black/80 hover:text-black"
              }
            >
              Shop
            </NavLink>
            <ChevronDown className="h-4 w-4 text-black" />
          </div>

          <NavLink
            to="/category/casual"
            className="font-normal text-black/80 hover:text-black"
          >
            On Sale
          </NavLink>
          <NavLink
            to="/category/formal"
            className="font-normal text-black/80 hover:text-black"
          >
            New Arrivals
          </NavLink>
          <NavLink
            to="/category/street"
            className="font-normal text-black/80 hover:text-black"
          >
            Brands
          </NavLink>
        </nav>

        {/* Search pill */}
        <div className="hidden flex-1 items-center gap-3 rounded-[62px] bg-[#F0F0F0] px-4 py-3 md:flex">
          <Search className="h-5 w-5 text-black/40" />
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-transparent text-base font-normal text-black placeholder:text-black/40 outline-none"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center text-black hover:text-black/70"
          >
            <ShoppingBag className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            aria-label="Profile"
            className="hidden h-10 w-10 items-center justify-center text-black hover:text-black/70 md:flex"
          >
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

