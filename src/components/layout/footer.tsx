import { Link } from "react-router-dom"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react"

import FooterBg from "@/assets/Footer.png"
import Logo from "@/assets/Navbar/logo.png"

export function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${FooterBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-[1440px] mx-auto px-8 py-12 lg:px-16 lg:py-16 gap-12 bg-white/40 backdrop-blur-[2px]">

        {/* Logo Section */}
        <div className="flex flex-col items-start lg:w-1/4">
          <div className="bg-white rounded-xl shadow-md p-4 flex items-center justify-center -rotate-2 transform hover:rotate-0 transition-transform duration-300">
            <img src={Logo} alt="Bahurani Saree" className="h-14 lg:h-16 w-auto object-contain" />
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/4">
          <h3 className="text-lg font-serif font-semibold text-black mb-6 uppercase tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-4 font-serif text-[15px] text-black">
            <li>
              <Link to="/" className="hover:text-red-700 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-700 transition-colors">About</Link>
            </li>
            <li>
              <Link to="/gallery" className="hover:text-red-700 transition-colors">Gallery</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-700 transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Social Network Section */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/4">
          <h3 className="text-lg font-serif font-semibold text-black mb-6 uppercase tracking-wide">
            Social Network
          </h3>
          <ul className="space-y-4 font-serif text-[15px] text-black">
            <li>
              <a href="#" className="flex items-center gap-3 hover:text-red-700 transition-colors">
                <Facebook className="h-5 w-5 text-red-600" />
                <span>@bahuranisareebhopal</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 hover:text-red-700 transition-colors">
                <Instagram className="h-5 w-5 text-red-600" />
                <span>bahurani_</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 hover:text-red-700 transition-colors">
                <Youtube className="h-5 w-5 text-red-600" />
                <span>Bahurani Saree</span>
              </a>
            </li>
          </ul>

          {/* Payment Icons */}
          <div className="flex items-center gap-2 mt-8">
            <div className="bg-[#003087] text-white text-[10px] font-bold px-3 py-1.5 rounded-sm">PayPal</div>
            <div className="bg-[#1A1F71] text-white text-[10px] italic font-bold px-3 py-1.5 rounded-sm">VISA</div>
            <div className="flex items-center px-2 py-1 bg-black rounded-sm h-[24px]">
              <div className="w-3 h-3 rounded-full bg-red-500 opacity-90 -mr-1 z-10"></div>
              <div className="w-3 h-3 rounded-full bg-orange-500 opacity-90"></div>
            </div>
            <div className="bg-[#2474BC] text-white text-[8px] leading-tight text-center font-bold px-2 py-1 rounded-sm w-[46px]">AMERICAN<br />EXPRESS</div>
          </div>
        </div>

        {/* Address List Section */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/4">
          <h3 className="text-lg font-serif font-semibold text-black mb-6 uppercase tracking-wide">
            Address List
          </h3>
          <ul className="space-y-6 font-serif text-[15px] text-black">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-red-700 shrink-0 mt-0.5" fill="white" />
              <span className="leading-tight">New Market , Bhopal , Madhya<br />Pradesh</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-red-700 shrink-0" fill="white" />
              <span>0755-422-2715</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-red-700 shrink-0" fill="white" />
              <span>contact@bahuranisaree.com.in</span>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  )
}
