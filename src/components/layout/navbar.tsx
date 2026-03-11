import { Link, NavLink } from "react-router-dom"
import { useCart } from "@/contexts/cart-context"
import logoImg from "@/assets/Navbar/logo.png"
import { IoSearchOutline } from "react-icons/io5"
import { FaHeart, FaUserCircle, FaShoppingCart } from "react-icons/fa"

const CATEGORY_ITEMS = [
  "All",
  "SAREE",
  "LEHENGA",
  "INDO WESTERN",
  "RAJPUTI POSHAK",
  "KURTIS",
]

const LINK_ITEMS = [
  "CONTACT US",
]

export function Navbar() {
  const { items } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white flex flex-col font-sans">
      {/* Top Navbar */}
      <div className="mx-auto w-full max-w-[1440px] px-4 py-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="shrink-0 mr-8">
          <img src={logoImg} alt="Shop.co Logo" className="h-[50px] md:h-[50px] w-auto drop-shadow-sm" />
        </Link>

        {/* Search Input */}
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
          <div className="flex items-center gap-5 rounded-[40px] border border-zinc-200 bg-white px-5 py-2 shadow-[0px_2px_8px_rgba(0,0,0,0.15)]">
            <Link to="/wishlist" aria-label="Wishlist" className="text-black hover:text-[#AE2534]">
              <FaHeart className="h-[22px] w-[22px]" />
            </Link>

            <Link to="/profile" aria-label="Profile" className="text-black hover:text-[#AE2534]">
              <FaUserCircle className="h-[22px] w-[22px]" />
            </Link>

            <Link to="/cart" aria-label="Cart" className="relative flex items-center text-black hover:text-[#AE2534]">
              <FaShoppingCart className="h-[22px] w-[22px]" />
              <span className="absolute -top-[12px] -right-[12px] flex h-[20px] w-[20px] items-center justify-center font-bold text-[12px] text-black bg-white rounded-full">
                {cartCount}
              </span>
            </Link>
          </div>
          {/* Below Icons Texts */}
          <div className="flex w-full justify-between px-2 mt-2 text-[12px] text-zinc-600 font-medium">
            <Link to="/login" className="hover:text-black">Login</Link>
            <Link to="/register" className="hover:text-black">Register</Link>
          </div>
        </div>
      </div>

      {/* Red Navigation Bar */}
      <div
        className="w-full h-[33px] flex items-center justify-center gap-[23px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
        style={{
          background: "linear-gradient(90deg, #AE2534 0%, #480F16 19%, #62151D 34%, #7B1A25 90%)"
        }}
      >
        <div className="flex items-center gap-[23px]">
          {CATEGORY_ITEMS.map((item, index) => (
            <NavLink
              key={index}
              to={`/category/${item.toLowerCase().replace(/ /g, "-")}`}
              className="flex h-[27px] items-center justify-center px-[10px] text-[14px] text-white font-['Inter'] font-normal hover:text-white/80"
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
              className="flex items-center justify-center text-[13px] text-white/90 font-['Inter'] font-medium hover:text-white tracking-wide"
            >
              {item}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  )
}
