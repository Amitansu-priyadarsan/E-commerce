import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useWishlist } from "@/contexts/wishlist-context"
import { products } from "@/data/products"
import { Star, ShoppingCart, Heart, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export function WishlistPage() {
    const { wishlist, toggleWishlist } = useWishlist()
    const { addItem } = useCart()

    const wishlistItems = products.filter(p => wishlist.includes(p.id))

    if (wishlistItems.length === 0) {
        return (
            <div className="py-20 px-4">
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight text-center mb-10">Your Wishlist</h1>
                <Card className="max-w-md mx-auto p-12 rounded-[32px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 flex flex-col items-center gap-6 text-center">
                    <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center mb-2">
                        <Heart className="w-10 h-10 text-zinc-200" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-zinc-900 mb-2">Your wishlist is empty</h2>
                        <p className="text-zinc-500 text-sm leading-relaxed">
                            Save items that you like in your wishlist. Review them anytime and easily move them to the cart.
                        </p>
                    </div>
                    <Link to="/category/all" className="inline-flex h-12 items-center justify-center rounded-full bg-black px-10 text-sm font-bold text-white hover:bg-zinc-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                        Start Shopping
                    </Link>
                </Card>
            </div>
        )
    }

    return (
        <div className="py-12 px-6 sm:px-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <nav className="mb-2 text-xs text-zinc-400">
                        <Link to="/" className="hover:text-zinc-700 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <span className="font-medium text-zinc-800">Wishlist</span>
                    </nav>
                    <h1 className="text-4xl font-bold text-zinc-900 tracking-tight">Wishlist <span className="text-zinc-300 font-normal ml-2">({wishlistItems.length})</span></h1>
                </div>
                <button
                    onClick={() => wishlist.forEach(id => toggleWishlist(id))}
                    className="text-sm font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-2"
                >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {wishlistItems.map((product) => {
                    const discount = product.originalPrice && product.originalPrice > product.price
                        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                        : null

                    return (
                        <div key={product.id} className="group relative bg-white rounded-3xl border border-zinc-100 p-3 hover:shadow-xl transition-all duration-300">
                            {/* Image wrapper */}
                            <Link to={`/product/${product.id}`} className="block relative aspect-4/5 overflow-hidden rounded-2xl mb-4 bg-zinc-50">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                />
                                {discount && (
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
                                        -{discount}%
                                    </span>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleWishlist(product.id)
                                    }}
                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 shadow-lg hover:scale-110 transition-transform"
                                >
                                    <Heart className="w-4 h-4 fill-red-500" />
                                </button>
                            </Link>

                            {/* Info */}
                            <div className="px-1 pb-2">
                                <Link to={`/product/${product.id}`} className="block text-[13px] font-bold text-zinc-900 mb-1.5 hover:underline truncate">
                                    {product.name}
                                </Link>

                                <div className="flex items-center gap-1 mb-2">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-[11px] font-bold text-zinc-700">{product.rating}</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-zinc-900">₹{product.price.toLocaleString()}</span>
                                        {product.originalPrice && (
                                            <span className="text-[10px] text-zinc-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => {
                                            addItem({
                                                id: product.id,
                                                name: product.name,
                                                price: product.price,
                                                originalPrice: product.originalPrice,
                                                image: product.image,
                                                quantity: 1
                                            })
                                        }}
                                        className="w-9 h-9 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:bg-[#AE2534] transition-colors shadow-lg"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
