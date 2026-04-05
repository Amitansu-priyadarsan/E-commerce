import React, { createContext, useContext, useState, useEffect, useCallback } from "react"
import { wishlistApi } from "@/services/api"
import { useAuth } from "@/contexts/auth-context"

interface WishlistProduct {
  id: string
  name: string
  price: number
  original_price?: number
  image_url: string
  rating: number
  category: string
}

interface WishlistItem {
  id: string
  product_id: string
  products: WishlistProduct
}

interface WishlistContextType {
  items: WishlistItem[]
  wishlistIds: Set<string>
  loading: boolean
  /** Toggle a product. If not logged in, calls onLoginRequired instead. */
  toggle: (productId: string, onLoginRequired?: () => void) => Promise<void>
  isInWishlist: (productId: string) => boolean
  clearLocal: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(false)

  const wishlistIds = new Set(items.map((i) => i.product_id))

  // Fetch from API whenever user logs in
  useEffect(() => {
    if (!user) {
      setItems([])
      return
    }
    setLoading(true)
    wishlistApi
      .get(user.user_id)
      .then((res) => setItems(res.data as WishlistItem[]))
      .catch(() => setItems([]))
      .finally(() => setLoading(false))
  }, [user?.user_id])

  const toggle = useCallback(
    async (productId: string, onLoginRequired?: () => void) => {
      if (!user) {
        onLoginRequired?.()
        return
      }
      const alreadyIn = wishlistIds.has(productId)
      // Optimistic update
      if (alreadyIn) {
        setItems((prev) => prev.filter((i) => i.product_id !== productId))
        try {
          await wishlistApi.remove(user.user_id, productId)
        } catch {
          // revert on failure — re-fetch
          wishlistApi.get(user.user_id).then((res) => setItems(res.data as WishlistItem[]))
        }
      } else {
        try {
          await wishlistApi.add(user.user_id, productId)
          // Re-fetch to get full product data
          const res = await wishlistApi.get(user.user_id)
          setItems(res.data as WishlistItem[])
        } catch {
          /* ignore */
        }
      }
    },
    [user, wishlistIds]
  )

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.has(productId),
    [wishlistIds]
  )

  function clearLocal() {
    setItems([])
  }

  return (
    <WishlistContext.Provider value={{ items, wishlistIds, loading, toggle, isInWishlist, clearLocal }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
