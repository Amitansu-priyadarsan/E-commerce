import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useCart } from "@/contexts/cart-context"
import logoImg from "@/assets/Navbar/logo.png"
import { IoSearchOutline } from "react-icons/io5"
import { FaHeart, FaUserCircle, FaShoppingCart } from "react-icons/fa"
import { Menu, X } from "lucide-react"

const CATEGORY_ITEMS = [
  "All",
  "Kurtis",
  "Saree",
  "Lehenga",
  "Salwar",
  "Anarkali",
  "Pashtuni",
]

const LINK_ITEMS = [
  "CONTACT US",
]

export function Navbar() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white flex flex-col font-sans relative">
      {/* Top Navbar */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-3 sm:py-4 sm:px-8 flex items-center justify-between gap-2 md:gap-4">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-2 md:gap-8">
          <button
            className="md:hidden p-1.5 text-zinc-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          <Link to="/" className="shrink-0 flex items-center">
            <img src={logoImg} alt="Shop.co Logo" className="h-[36px] sm:h-[45px] md:h-[50px] w-auto " />
          </Link>
        </div>

        {/* Desktop Search Input */}
        <div className="hidden md:flex flex-1 max-w-[600px] items-center gap-3 rounded-full border border-zinc-300 px-4 py-2 bg-white">
          <IoSearchOutline className="h-5 w-5 text-[#AE2534] shrink-0" />
          <input
            type="text"
            placeholder="Search for Saree, Lehenga, Indo West and More.."
            className="w-full bg-transparent text-sm text-black placeholder:text-zinc-400 outline-none"
          />
        </div>

        {/* Right side icons & links */}
        <div className="flex flex-col items-center">
          {/* Icons container */}
          <div className="flex items-center gap-3 sm:gap-5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 sm:px-5 sm:py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.1)] md:shadow-[0px_2px_8px_rgba(0,0,0,0.15)]">
            <Link to="/wishlist" aria-label="Wishlist" className="text-black hover:text-[#AE2534] transition-colors">
              <FaHeart className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </Link>

            <Link to="/profile" aria-label="Profile" className="text-black hover:text-[#AE2534] transition-colors">
              <FaUserCircle className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
            </Link>

            <Link to="/cart" aria-label="Cart" className="relative flex items-center text-black hover:text-[#AE2534] transition-colors">
              <FaShoppingCart className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" />
              <span className="absolute -top-[10px] sm:-top-[12px] -right-[10px] sm:-right-[12px] flex h-[16px] w-[16px] sm:h-[20px] sm:w-[20px] items-center justify-center font-bold text-[9px] sm:text-[12px] text-black bg-white rounded-full shadow-sm sm:shadow-md">
                {cartCount}
              </span>
            </Link>
          </div>
          {/* Desktop Only: Below Icons Texts */}
          <div className="hidden md:flex w-full justify-between px-2 mt-1 text-[11px] text-zinc-500 font-medium">
            <Link to="/login" className="hover:text-black">Login</Link>
            <Link to="/register" className="hover:text-black">Register</Link>
          </div>
        </div>
      </div>

      {/* Red Navigation Bar (Desktop Only) */}
      <nav
        className="hidden md:flex w-full h-[33px] items-center justify-center gap-[23px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] z-10"
        style={{
          background: "linear-gradient(90deg, #AE2534 0%, #480F16 19%, #62151D 34%, #7B1A25 90%)"
        }}
      >
        <div className="flex items-center gap-[23px]">
          {CATEGORY_ITEMS.map((item, index) => (
            <NavLink
              key={index}
              to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
              className="flex h-[27px] items-center justify-center px-[10px] text-[14px] text-white font-['Inter'] font-normal hover:text-white/80 transition-colors"
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-[30px] ml-16 pl-8 border-l border-white/20 h-[20px]">
          {LINK_ITEMS.map((item, index) => (
            <NavLink
              key={index}
              to={`/${item.toLowerCase().replace(/ /g, "-")}`}
              className="flex items-center justify-center text-[13px] text-white/90 font-['Inter'] font-medium hover:text-white tracking-wide transition-colors"
            >
              {item}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Mobile Menu Slide-over */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[100] md:hidden transition-opacity"
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Menu Panel */}
          <div className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[320px] bg-white z-[101] md:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out">
            <div className="p-6 border-b flex items-center justify-between">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={logoImg} alt="Logo" className="h-10 w-auto" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="p-1 text-zinc-500 hover:text-black">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="px-6 py-4">
              <div className="flex items-center gap-3 rounded-full border border-zinc-200 px-4 py-2 bg-zinc-50 focus-within:ring-1 focus-within:ring-[#AE2534] transition-all">
                <IoSearchOutline className="h-4 w-4 text-[#AE2534] shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-sm text-black placeholder:text-zinc-400 outline-none"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-bold mb-4">Categories</h3>
                  <div className="flex flex-col gap-4">
                    {CATEGORY_ITEMS.map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-lg font-medium transition-colors ${isActive ? 'text-[#AE2534]' : 'text-zinc-800 hover:text-[#AE2534]'}`
                        }
                      >
                        {item}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100">
                  <div className="flex flex-col gap-4">
                    {LINK_ITEMS.map((item, index) => (
                      <NavLink
                        key={index}
                        to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-lg font-medium text-zinc-800 hover:text-[#AE2534] transition-colors"
                      >
                        {item}
                      </NavLink>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-zinc-100 space-y-4">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-lg border border-[#AE2534] text-[#AE2534] font-semibold hover:bg-zinc-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex h-11 w-full items-center justify-center rounded-lg bg-[#AE2534] text-white font-semibold hover:bg-[#8e1e2a] transition-colors"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 border-t">
              <p className="text-center text-xs text-zinc-400 font-medium">© 2024 Pehnava Saree. All rights reserved.</p>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
