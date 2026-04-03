import { X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  authMode?: "signin" | "signup"
}

export function LoginModal({ isOpen, onClose, authMode = "signin" }: LoginModalProps) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState<"signin" | "signup">(authMode)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleSubmit() {
    setError("")
    if (!email || !password) {
      setError("Email and password are required.")
      return
    }
    setLoading(true)
    try {
      if (mode === "signin") {
        await login(email, password)
      } else {
        await register(email, password, fullName || undefined)
      }
      onClose()
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail ??
        "Something went wrong. Please try again."
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-[460px] pt-16 pb-6 relative bg-white rounded-2xl flex flex-col justify-start items-start gap-10 shadow-xl"
        style={{ outline: "1px solid #ECECEE" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-7 h-7 p-2 absolute right-4 top-4 bg-white rounded-full flex justify-center items-center hover:bg-gray-50 transition-all text-[#454547]"
          style={{ outline: "1px solid #ECECEE" }}
        >
          <X className="w-4 h-4 shrink-0" />
        </button>

        <div className="self-stretch px-6 flex-col justify-start items-start gap-8 flex">
          {/* Mode tabs */}
          <div
            className="h-12 p-1.5 rounded-full flex justify-start items-center gap-2 w-full"
            style={{
              background: "linear-gradient(180deg, rgba(248, 248, 251, 0.60) 0%, white 50%, white 100%)",
              outline: "1.75px solid white",
            }}
          >
            <button
              onClick={() => { setMode("signin"); setError("") }}
              className={`flex-1 h-9 px-3 py-2.5 rounded-full justify-center items-center flex transition-all text-sm font-normal font-['Inter'] leading-relaxed ${
                mode === "signin"
                  ? "bg-white shadow-[1px_2px_4px_#ECECEE] text-[#121214]"
                  : "text-[#8B8B8C] hover:text-[#454547]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode("signup"); setError("") }}
              className={`flex-1 h-9 px-3 py-2.5 rounded-full justify-center items-center flex transition-all text-sm font-normal font-['Inter'] leading-relaxed ${
                mode === "signup"
                  ? "bg-white shadow-[1px_2px_4px_#ECECEE] text-[#121214]"
                  : "text-[#8B8B8C] hover:text-[#454547]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Title */}
          <div className="self-stretch flex-col gap-0.5 flex">
            <div className="text-[#121214] text-base font-semibold font-['Inter'] leading-normal">
              {mode === "signup" ? "Create your account" : "Sign in to your account"}
            </div>
            <div className="text-[#5D5D5E] text-sm font-normal font-['Inter'] leading-relaxed">
              {mode === "signup"
                ? "Enter your details to get started with orders, loyalty rewards & more"
                : "Enter your email and password to continue"}
            </div>
          </div>

          {/* Fields */}
          <div className="self-stretch flex-col gap-3 flex w-full">
            {mode === "signup" && (
              <div className="self-stretch w-full p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
                <input
                  type="text"
                  placeholder="Full name (optional)"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
                />
              </div>
            )}
            <div className="self-stretch w-full p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
              />
            </div>
            <div className="self-stretch w-full p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
              />
            </div>

            {error && (
              <p className="text-sm text-[#AE2534] font-['Inter']">{error}</p>
            )}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="self-stretch px-5 justify-end items-center gap-4 inline-flex">
          <button
            onClick={() => { onClose(); setError("") }}
            className="h-[52px] px-6 py-2.5 rounded-full backdrop-blur-md justify-center items-center gap-1.5 flex hover:opacity-80 transition-opacity"
            style={{
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
              outline: "1px solid #99001E",
            }}
          >
            <span className="text-[#99001E] text-sm font-medium font-['Inter'] leading-relaxed">Cancel</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="h-[52px] px-6 py-2.5 bg-[#B84D62] hover:bg-[#99001E] transition-colors rounded-full justify-center items-center gap-1.5 flex cursor-pointer backdrop-blur-md disabled:opacity-60"
          >
            <span className="text-[rgba(248,248,251,0.9)] text-sm font-medium font-['Inter'] leading-relaxed">
              {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
