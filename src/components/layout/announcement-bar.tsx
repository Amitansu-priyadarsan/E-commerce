import { Link } from "react-router-dom"

export function AnnouncementBar() {
  return (
    <div className="w-full bg-black py-2 text-center text-xs font-medium text-white">
      <Link to="/category/sale" className="underline-offset-4 hover:underline">
        Get 20% off your first order — Shop the sale
      </Link>
    </div>
  )
}

