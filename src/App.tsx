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
import { OrdersPage } from "@/pages/orders-page"
import { CheckoutPage } from "@/pages/checkout-page"
import { OrderConfirmationPage } from "@/pages/order-confirmation-page"
import { AdminLoginPage } from "@/pages/admin-login-page"
import { AdminDashboardPage } from "@/pages/admin-dashboard-page"
import { AdminOrderDetailPage } from "@/pages/admin-order-detail-page"
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
    // Skip loader for admin, category, checkout, and order-confirmation pages
    if (pathname.startsWith("/admin") || pathname.startsWith("/category") || pathname.startsWith("/checkout") || pathname.startsWith("/order-confirmation")) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [pathname])

  // Admin pages render without the main Layout
  if (pathname.startsWith("/admin")) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/orders/:orderId" element={<AdminOrderDetailPage />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    )
  }

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
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  )
}

export default App
