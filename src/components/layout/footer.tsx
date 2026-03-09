import { Link } from "react-router-dom"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="mt-0 bg-[#F0F0F0] pb-10 pt-4">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-8 lg:flex-row lg:gap-12 lg:px-0">
        <div className="space-y-4 lg:w-1/3">
          <div className="text-xl font-black tracking-[0.2em]">SHOP.CO</div>
          <p className="max-w-sm text-sm text-zinc-600">
            Modern streetwear for everyday icons. Minimal, monochrome, and
            built for the city.
          </p>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, index) => (
              <button
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 text-sm md:grid-cols-4">
          <FooterColumn
            title="Shop"
            links={["All", "New Arrivals", "Best Sellers", "Sale"]}
          />
          <FooterColumn
            title="Collections"
            links={["Casual", "Formal", "Streetwear", "Essentials"]}
          />
          <FooterColumn
            title="Company"
            links={["About", "Careers", "Stories", "Press"]}
          />
          <FooterColumn
            title="Support"
            links={["Help Center", "Shipping", "Returns", "Contact"]}
          />
        </div>
      </div>
      <div className="mx-auto mt-6 w-full max-w-6xl border-t border-zinc-200 px-4 pt-4 text-xs text-zinc-500 lg:px-0">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p>© {new Date().getFullYear()} SHOP.CO. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-zinc-700">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-zinc-700">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string
  links: string[]
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-zinc-600">
        {links.map((link) => (
          <li key={link}>
            <Link to="#" className="hover:text-black">
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

