export type Product = {
  id: string
  name: string
  category: "casual" | "formal" | "street" | "essentials"
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  colors: string[]
  sizes: string[]
  tags?: string[]
}

export const products: Product[] = [
  {
    id: "hoodie-urban-gray",
    name: "Urban Oversized Hoodie",
    category: "street",
    price: 89,
    originalPrice: 120,
    rating: 4.8,
    reviews: 214,
    image:
      "https://images.pexels.com/photos/6311593/pexels-photo-6311593.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#111111", "#F0F0F0"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["new"],
  },
  {
    id: "tee-minimal-white",
    name: "Minimal Mockneck Tee",
    category: "essentials",
    price: 49,
    rating: 4.6,
    reviews: 133,
    image:
      "https://images.pexels.com/photos/7671166/pexels-photo-7671166.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#FFFFFF", "#1F2933"],
    sizes: ["XS", "S", "M", "L"],
    tags: ["new"],
  },
  {
    id: "trouser-pleated-black",
    name: "Pleated City Trousers",
    category: "formal",
    price: 109,
    originalPrice: 140,
    rating: 4.9,
    reviews: 98,
    image:
      "https://images.pexels.com/photos/6311602/pexels-photo-6311602.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#111111"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top"],
  },
  {
    id: "jacket-cropped-bomber",
    name: "Cropped Nylon Bomber",
    category: "street",
    price: 129,
    rating: 4.7,
    reviews: 176,
    image:
      "https://images.pexels.com/photos/6311604/pexels-photo-6311604.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#111111", "#4B5563"],
    sizes: ["S", "M", "L"],
    tags: ["top"],
  },
  {
    id: "set-relaxed-suit",
    name: "Relaxed Suit Set",
    category: "formal",
    price: 189,
    rating: 4.5,
    reviews: 63,
    image:
      "https://images.pexels.com/photos/6311663/pexels-photo-6311663.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#111111", "#9CA3AF"],
    sizes: ["M", "L", "XL"],
  },
  {
    id: "pants-wide-leg-cream",
    name: "Wide-Leg Twill Pants",
    category: "casual",
    price: 99,
    rating: 4.4,
    reviews: 75,
    image:
      "https://images.pexels.com/photos/6311655/pexels-photo-6311655.jpeg?auto=compress&cs=tinysrgb&w=800",
    colors: ["#F0F0F0", "#111111"],
    sizes: ["S", "M", "L"],
  },
]

