import { useEffect, useState } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { Layout } from "@/components/layout/layout"
import { HomePage } from "@/pages/home-page"
import { CategoryPage } from "@/pages/category-page"
import { ProductDetailPage } from "@/pages/product-detail-page"
import { CartPage } from "@/pages/cart-page"
import { ProfilePage } from "@/pages/profile-page"
import { WishlistPage } from "@/pages/wishlist-page"
import { ContactUsPage } from "@/pages/contact-us-page"
import PageLoader from "@/components/layout/page-loader"

function ScrollToTopOnRouteChange() {
  const { pathname } = useLocation()

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
    }
  }, [pathname])

  return null
}

function App() {
  const { pathname } = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip loader for category pages
    if (pathname.startsWith("/category")) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <Layout>
      {isLoading && <PageLoader />}
      <ScrollToTopOnRouteChange />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
