import { useState, useRef, useEffect } from "react"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import logoImg from "@/assets/Navbar/logo.png"
import { IoSearchOutline } from "react-icons/io5"
import { FaHeart, FaUserCircle, FaShoppingCart } from "react-icons/fa"
import { Menu, X } from "lucide-react"
import { LoginModal } from "@/components/auth/login-modal"

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
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const openLoginModal = (mode: "signin" | "signup") => {
    setAuthMode(mode)
    setIsLoginModalOpen(true)
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
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

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-zinc-600 hover:text-[#AE2534] hover:bg-red-50 transition-colors"
          >
            <FaHeart className="h-[18px] w-[18px]" />
            <span className="hidden md:inline text-[13px] font-medium">Wishlist</span>
          </Link>

          {/* Profile icon — single button for both logged-in and logged-out */}
          <div className="relative" ref={dropdownRef}>
            <button
              aria-label="Account"
              onClick={() => user ? setIsDropdownOpen(o => !o) : openLoginModal("signin")}
              className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-200 bg-white shadow-sm text-zinc-600 hover:text-[#AE2534] hover:border-[#AE2534] transition-colors"
            >
              <FaUserCircle className={`h-[20px] w-[20px] ${user ? "text-[#AE2534]" : ""}`} />
            </button>

            {/* Dropdown — only when logged in */}
            {user && isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 overflow-hidden z-50">
                {/* User info */}
                <div className="px-4 py-3 border-b border-zinc-100">
                  <p className="text-[13px] font-semibold text-zinc-800 truncate">{user.full_name ?? "My Account"}</p>
                  <p className="text-[11px] text-zinc-400 truncate mt-0.5">{user.email}</p>
                </div>
                {/* Menu items */}
                <div className="py-1.5">
                  <button
                    onClick={() => { setIsDropdownOpen(false); navigate("/profile") }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-zinc-50 hover:text-[#AE2534] transition-colors"
                  >
                    <FaUserCircle className="h-4 w-4 shrink-0" />
                    My Profile
                  </button>
                </div>
                {/* Logout */}
                <div className="border-t border-zinc-100 py-1.5">
                  <button
                    onClick={() => { setIsDropdownOpen(false); logout() }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[13px] text-zinc-700 hover:bg-red-50 hover:text-[#AE2534] transition-colors"
                  >
                    <X className="h-4 w-4 shrink-0" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-full border border-zinc-200 bg-white shadow-sm text-zinc-700 hover:border-[#AE2534] hover:text-[#AE2534] transition-colors"
          >
            <FaShoppingCart className="h-[18px] w-[18px]" />
            {cartCount > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center font-bold text-[10px] text-white bg-[#AE2534] rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
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

                <div className="pt-6 border-t border-zinc-100 space-y-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-2 px-1 text-sm text-zinc-700 font-medium">
                        <FaUserCircle className="h-4 w-4 text-[#AE2534]" />
                        <div>
                          <p className="font-semibold text-zinc-800">{user.full_name ?? "My Account"}</p>
                          <p className="text-[11px] text-zinc-400">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setIsMenuOpen(false); navigate("/profile") }}
                        className="flex h-11 w-full items-center justify-center rounded-xl border border-zinc-200 text-zinc-700 font-semibold hover:border-[#AE2534] hover:text-[#AE2534] transition-colors"
                      >
                        My Profile
                      </button>
                      <button
                        onClick={() => { setIsMenuOpen(false); logout() }}
                        className="flex h-11 w-full items-center justify-center rounded-xl border border-[#AE2534] text-[#AE2534] font-semibold hover:bg-red-50 transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setIsMenuOpen(false); openLoginModal("signin") }}
                        className="flex h-11 w-full items-center justify-center rounded-xl border border-[#AE2534] text-[#AE2534] font-semibold hover:bg-zinc-50 transition-colors"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => { setIsMenuOpen(false); openLoginModal("signup") }}
                        className="flex h-11 w-full items-center justify-center rounded-xl bg-[#AE2534] text-white font-semibold hover:bg-[#8e1e2a] transition-colors"
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 border-t">
              <p className="text-center text-xs text-zinc-400 font-medium">© 2024 Pehnava. All rights reserved.</p>
            </div>
          </div>
        </>
      )}
    </header>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} authMode={authMode} />
    </>
  )
}
