import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import api from "@/services/api"

interface AuthUser {
  user_id: string
  email: string
  full_name: string | null
  phone_number: string | null
  address: string | null
  city: string | null
  pincode: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name?: string) => Promise<void>
  logout: () => void
  updateAddress: (address: string, city: string, pincode: string, phone_number?: string) => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [token, setToken] = useState<string | null>(null)

  // Restore from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")
    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }
  }, [])

  function persist(tokenValue: string, userValue: AuthUser) {
    localStorage.setItem("auth_token", tokenValue)
    localStorage.setItem("auth_user", JSON.stringify(userValue))
    setToken(tokenValue)
    setUser(userValue)
  }

  async function login(email: string, password: string) {
    const res = await api.post<{
      access_token: string
      user_id: string
      email: string
      full_name: string | null
    }>("/auth/login", { email, password })
    const { access_token, user_id, email: userEmail, full_name } = res.data

    // Fetch address + phone from profile after login
    let address = null, city = null, pincode = null, phone_number = null
    try {
      const profileRes = await api.get<{ address: string | null; city: string | null; pincode: string | null; phone_number: string | null }>(
        "/users/me",
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      address = profileRes.data.address
      city = profileRes.data.city
      pincode = profileRes.data.pincode
      phone_number = profileRes.data.phone_number
    } catch { /* profile fetch failure is non-blocking */ }

    persist(access_token, { user_id, email: userEmail, full_name, phone_number, address, city, pincode })
  }

  async function register(email: string, password: string, full_name?: string) {
    const res = await api.post<{
      access_token: string
      user_id: string
      email: string
      full_name: string | null
    }>("/auth/register", { email, password, full_name })
    const { access_token, user_id, email: userEmail, full_name: name } = res.data
    persist(access_token, { user_id, email: userEmail, full_name: name, phone_number: null, address: null, city: null, pincode: null })
  }

  async function updateAddress(address: string, city: string, pincode: string, phone_number?: string) {
    const patch: Record<string, string> = { address, city, pincode }
    if (phone_number) patch.phone_number = phone_number
    await api.patch("/users/me", patch)
    // Write to localStorage first (synchronously) so checkout-page snapshot always reads fresh data
    const stored = localStorage.getItem("auth_user")
    const base = stored ? JSON.parse(stored) : user
    const updated = { ...base, address, city, pincode, phone_number: phone_number || base?.phone_number || null }
    localStorage.setItem("auth_user", JSON.stringify(updated))
    setUser(updated)
  }

  function logout() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateAddress }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
