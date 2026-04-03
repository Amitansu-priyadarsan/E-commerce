import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import api from "@/services/api"

interface AuthUser {
  user_id: string
  email: string
  full_name: string | null
}

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name?: string) => Promise<void>
  logout: () => void
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
    persist(access_token, { user_id, email: userEmail, full_name })
  }

  async function register(email: string, password: string, full_name?: string) {
    const res = await api.post<{
      access_token: string
      user_id: string
      email: string
      full_name: string | null
    }>("/auth/register", { email, password, full_name })
    const { access_token, user_id, email: userEmail, full_name: name } = res.data
    persist(access_token, { user_id, email: userEmail, full_name: name })
  }

  function logout() {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
