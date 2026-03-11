import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"

export function WishlistPage() {
    return (
        <div className="py-10">
            <h1 className="text-2xl font-bold uppercase tracking-[0.18em] text-center mb-6">Wishlist</h1>
            <Card className="max-w-md mx-auto p-10 rounded-[28px] bg-white shadow-sm border border-zinc-200 flex flex-col items-center gap-6">
                <p className="text-zinc-600 text-center font-satoshi">Your wishlist is currently empty.</p>
                <Link to="/" className="inline-flex h-10 items-center justify-center rounded-full bg-black px-8 text-sm font-satoshi font-medium text-white hover:bg-zinc-800">
                    Start Shopping
                </Link>
            </Card>
        </div>
    )
}
