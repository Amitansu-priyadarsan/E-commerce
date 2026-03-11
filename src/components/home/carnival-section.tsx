import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useNavigate } from "react-router-dom"

import CarnivalBanner from "@/assets/Hero/Carnival.png"
import LehengaImg from "@/assets/Hero/Lehenga.png"
import Lehenga2Img from "@/assets/Hero/Lehenga2.png"
import BanarasiImg from "@/assets/Hero/Banarasi.png"
import KanchipuramImg from "@/assets/Hero/Kanchipuram.png"

const mockProducts = [
    {
        id: 1,
        name: "Swarna Saaj Bridal Lehenga",
        price: "4,500.00",
        image: LehengaImg,
        rating: 5,
        reviews: 5,
    },
    {
        id: 2,
        name: "Swarna Saaj Bridal Lehenga",
        price: "4,500.00",
        image: Lehenga2Img,
        rating: 5,
        reviews: 5,
    },
    {
        id: 3,
        name: "Swarna Saaj Bridal Lehenga",
        price: "4,500.00",
        image: BanarasiImg,
        rating: 5,
        reviews: 5,
    },
    {
        id: 4,
        name: "Swarna Saaj Bridal Lehenga",
        price: "4,500.00",
        image: KanchipuramImg,
        rating: 5,
        reviews: 5,
    },
]

export function CarnivalSection() {
    const { addItem } = useCart()
    const navigate = useNavigate()

    const handleAddToCart = (product: typeof mockProducts[0]) => {
        addItem({
            id: `carnival-${product.id}`,
            name: product.name,
            price: parseInt(product.price.replace(/,/g, "")),
            image: product.image,
            quantity: 1,
        })
    }

    const handleBuyNow = (product: typeof mockProducts[0]) => {
        handleAddToCart(product)
        navigate("/cart")
    }

    return (
        <section className="mt-16 w-full flex flex-col items-center">
            {/* Carnival Banner */}
            <div className="w-full max-w-[1440px] px-4 md:px-8">
                <div className="w-full overflow-hidden">
                    <img
                        src={CarnivalBanner}
                        alt="Carnival"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* 4 Cards */}
            <div className="w-full max-w-[1440px] px-4 md:px-8 mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {mockProducts.map((product) => (
                        <div key={product.id} className="group relative flex flex-col gap-3">
                            <div className="relative w-full aspect-3/4 overflow-hidden rounded-2xl bg-[#F0EEED]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Heart Icon */}
                                <button className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors">
                                    <Heart className="h-6 w-6" />
                                </button>

                                {/* Buttons overlay (Always visible now) */}
                                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 opacity-100 transition-opacity duration-300">
                                    <Button
                                        variant="secondary"
                                        className="h-9 flex-1 bg-white text-black hover:bg-zinc-100 rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5"
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to cart <ShoppingCart className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        className="h-9 flex-1 bg-white text-black hover:bg-zinc-100 rounded-lg text-xs font-semibold shadow-sm flex items-center justify-center gap-1.5"
                                        onClick={() => handleBuyNow(product)}
                                    >
                                        Buy now <ShoppingCart className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="flex flex-col gap-1 px-1">
                                <h3 className="text-sm text-zinc-600 font-medium line-clamp-1">{product.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-base font-bold text-black">₹ {product.price}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`h-3.5 w-3.5 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                                }`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                        </svg>
                                    ))}
                                    <span className="text-zinc-500 ml-1">({product.reviews})</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
