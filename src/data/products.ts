// Local asset imports
import Lehenga1 from "@/assets/Lehenga/Lehenga1.png"
import Lehenga2 from "@/assets/Lehenga/Lehenga2.png"
import Lehenga3 from "@/assets/Lehenga/Lehenga3.png"
import Lehenga4 from "@/assets/Lehenga/Lehenga4.png"
import Saree1 from "@/assets/Saree/Saree1.png"
import Saree2 from "@/assets/Saree/Saree2.png"
import Saree3 from "@/assets/Saree/Saree3.png"
import Saree4 from "@/assets/Saree/Saree4.png"

export type Product = {
  id: string
  name: string
  category: "kurtis" | "saree" | "lehenga" | "salwar" | "anarkali" | "pashtuni"
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
  // ─── KURTIS ──────────────────────────────────────────────────────────────────
  {
    id: "kurti-floral-pink",
    name: "Floral Printed Cotton Kurti",
    category: "kurtis",
    price: 899,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    colors: ["#E75480", "#FFFFFF", "#FFD700"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["new", "best-seller"],
  },
  {
    id: "kurti-block-print-blue",
    name: "Block Print Straight Kurti",
    category: "kurtis",
    price: 1099,
    originalPrice: 1599,
    rating: 4.6,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=800&auto=format&fit=crop&q=80",
    colors: ["#1E3A5F", "#F5E6D3", "#8B4513"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    tags: ["new"],
  },
  {
    id: "kurti-embroidered-green",
    name: "Embroidered Anarkali Kurti",
    category: "kurtis",
    price: 1499,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 427,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4d7e?w=800&auto=format&fit=crop&q=80",
    colors: ["#2D5016", "#8B1A1A", "#1A237E"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "featured"],
  },
  {
    id: "kurti-mirror-work-orange",
    name: "Mirror Work Festival Kurti",
    category: "kurtis",
    price: 1799,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80",
    colors: ["#FF6B35", "#FFD700", "#8B1A1A"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["new", "ethnic"],
  },
  {
    id: "kurti-kalamkari-teal",
    name: "Kalamkari Print Kurti",
    category: "kurtis",
    price: 1349,
    originalPrice: 1899,
    rating: 4.5,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    colors: ["#008080", "#8B4513", "#FFFFFF"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "handicraft"],
  },

  // ─── SAREES ──────────────────────────────────────────────────────────────────
  {
    id: "saree-banarasi-red",
    name: "Banarasi Silk Saree",
    category: "saree",
    price: 4999,
    originalPrice: 6999,
    rating: 4.9,
    reviews: 534,
    image: Saree1,
    colors: ["#8B0000", "#FFD700", "#006400"],
    sizes: ["Free Size"],
    tags: ["top", "premium"],
  },
  {
    id: "saree-chanderi-blue",
    name: "Chanderi Silk Cotton Saree",
    category: "saree",
    price: 2499,
    originalPrice: 3499,
    rating: 4.7,
    reviews: 298,
    image: Saree2,
    colors: ["#1E3A5F", "#E6D5C3", "#2D5016"],
    sizes: ["Free Size"],
    tags: ["new", "elegant"],
  },
  {
    id: "saree-maheshwari-violet",
    name: "Maheshwari Handloom Saree",
    category: "saree",
    price: 3299,
    originalPrice: 4599,
    rating: 4.8,
    reviews: 187,
    image: Saree3,
    colors: ["#6A0572", "#C0392B", "#FFD700"],
    sizes: ["Free Size"],
    tags: ["handloom", "vibrant"],
  },
  {
    id: "saree-kanjivaram-gold",
    name: "Kanjivaram Silk Saree",
    category: "saree",
    price: 7999,
    originalPrice: 10999,
    rating: 5.0,
    reviews: 412,
    image: Saree4,
    colors: ["#FFD700", "#8B0000", "#006400"],
    sizes: ["Free Size"],
    tags: ["top", "luxury"],
  },

  // ─── LEHENGAS ────────────────────────────────────────────────────────────────
  {
    id: "lehenga-bridal-pink",
    name: "Bridal Embroidered Lehenga",
    category: "lehenga",
    price: 12999,
    originalPrice: 18999,
    rating: 5.0,
    reviews: 87,
    image: Lehenga1,
    colors: ["#FF69B4", "#FFD700", "#8B1A1A"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "exclusive"],
  },
  {
    id: "lehenga-navratri-multicolor",
    name: "Navratri Chaniya Choli Set",
    category: "lehenga",
    price: 2999,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 342,
    image: Lehenga2,
    colors: ["#FF6B35", "#9B59B6", "#27AE60"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["new", "festive"],
  },
  {
    id: "lehenga-floral-yellow",
    name: "Floral Embroidery Lehenga",
    category: "lehenga",
    price: 5499,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 213,
    image: Lehenga3,
    colors: ["#FFD700", "#FF69B4", "#008080"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "modern"],
  },
  {
    id: "lehenga-anarkali-blue",
    name: "Anarkali Flared Lehenga Set",
    category: "lehenga",
    price: 8999,
    originalPrice: 12999,
    rating: 4.9,
    reviews: 156,
    image: Lehenga4,
    colors: ["#1E3A5F", "#8B0000", "#FFD700"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "royal"],
  },

  // ─── SALWAR SUITS ────────────────────────────────────────────────────────────
  {
    id: "salwar-cotton-yellow",
    name: "Cotton Linen Salwar Kameez",
    category: "salwar",
    price: 1299,
    originalPrice: 1999,
    rating: 4.5,
    reviews: 211,
    image:
      "https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=800&auto=format&fit=crop&q=80",
    colors: ["#FFD700", "#FFFFFF", "#FF69B4"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    tags: ["casual", "comfortable"],
  },
  {
    id: "salwar-patiala-multicolor",
    name: "Patiala Suit with Dupatta",
    category: "salwar",
    price: 1599,
    originalPrice: 2199,
    rating: 4.6,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4d7e?w=800&auto=format&fit=crop&q=80",
    colors: ["#9B59B6", "#E75480", "#27AE60"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "traditional"],
  },
  {
    id: "salwar-georgette-blue",
    name: "Georgette Straight Salwar Suit",
    category: "salwar",
    price: 2199,
    originalPrice: 2999,
    rating: 4.7,
    reviews: 143,
    image:
      "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&auto=format&fit=crop&q=80",
    colors: ["#1E3A5F", "#E75480", "#FFD700"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["semi-formal"],
  },

  // ─── ANARKALIS ───────────────────────────────────────────────────────────────
  {
    id: "anarkali-georgette-teal",
    name: "Georgette Anarkali with Dupatta",
    category: "anarkali",
    price: 2299,
    originalPrice: 3299,
    rating: 4.8,
    reviews: 264,
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800&auto=format&fit=crop&q=80",
    colors: ["#008080", "#8B1A1A", "#1E3A5F"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "elegant"],
  },
  {
    id: "anarkali-silk-red",
    name: "Heavy Silk Anarkali Suit",
    category: "anarkali",
    price: 3899,
    originalPrice: 5499,
    rating: 4.9,
    reviews: 189,
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80",
    colors: ["#8B0000", "#FFD700", "#006400"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "royal"],
  },

  // ─── PASHTUNI POSHAK ─────────────────────────────────────────────────────────
  {
    id: "pashtuni-traditional-blue",
    name: "Traditional Pashtuni Dress",
    category: "pashtuni",
    price: 3499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 98,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Pashtun_woman_in_traditional_dress.jpg/800px-Pashtun_woman_in_traditional_dress.jpg",
    colors: ["#1E3A5F", "#FFD700", "#8B0000"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["new", "cultural"],
  },
  {
    id: "pashtuni-embroidered-black",
    name: "Embroidered Pashtuni Kameez",
    category: "pashtuni",
    price: 4299,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 76,
    image:
      "https://images.unsplash.com/photo-1583391733981-8498408ee4b6?w=800&auto=format&fit=crop&q=80",
    colors: ["#111111", "#C0392B", "#FFD700"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "heritage"],
  },
  {
    id: "pashtuni-colorful-festive",
    name: "Festive Pashtuni Poshak Set",
    category: "pashtuni",
    price: 5999,
    originalPrice: 7999,
    rating: 5.0,
    reviews: 54,
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4d7e?w=800&auto=format&fit=crop&q=80",
    colors: ["#FF6B35", "#9B59B6", "#FFD700"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["top", "celebration"],
  },
]

