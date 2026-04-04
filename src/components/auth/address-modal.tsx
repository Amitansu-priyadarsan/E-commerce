import { X, MapPin } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"

interface AddressModalProps {
  isOpen: boolean
  onClose: () => void
  /** Called after address is successfully saved */
  onSaved?: () => void
  /** When true, the Skip button is hidden (mandatory before checkout) */
  required?: boolean
}

export function AddressModal({ isOpen, onClose, onSaved, required = false }: AddressModalProps) {
  const { user, updateAddress } = useAuth()

  // Always read from localStorage for freshest data (context may be stale after login)
  const fresh = (() => {
    try {
      const stored = localStorage.getItem("auth_user")
      return stored ? JSON.parse(stored) : user
    } catch { return user }
  })()

  const [address, setAddress] = useState(fresh?.address ?? "")
  const [city, setCity] = useState(fresh?.city ?? "")
  const [pincode, setPincode] = useState(fresh?.pincode ?? "")
  const [phone, setPhone] = useState(fresh?.phone_number ?? "")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  async function handleSave() {
    setError("")
    if (!address.trim() || !city.trim() || !pincode.trim()) {
      setError("Address, city and pincode are required.")
      return
    }
    if (!/^\d{6}$/.test(pincode.trim())) {
      setError("Pincode must be exactly 6 digits.")
      return
    }
    if (phone.trim() && !/^\d{10}$/.test(phone.trim())) {
      setError("Phone number must be exactly 10 digits.")
      return
    }
    setLoading(true)
    try {
      await updateAddress(address.trim(), city.trim(), pincode.trim(), phone.trim() || undefined)
      onSaved?.()
      onClose()
    } catch {
      setError("Failed to save details. Please try again.")
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
        {!required && (
          <button
            onClick={onClose}
            className="w-7 h-7 p-2 absolute right-4 top-4 bg-white rounded-full flex justify-center items-center hover:bg-gray-50 transition-all text-[#454547]"
            style={{ outline: "1px solid #ECECEE" }}
          >
            <X className="w-4 h-4 shrink-0" />
          </button>
        )}

        <div className="self-stretch px-6 flex-col justify-start items-start gap-8 flex">
          {/* Header */}
          <div className="self-stretch flex-col gap-0.5 flex">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#AE2534]" />
              <div className="text-[#121214] text-base font-semibold font-['Inter'] leading-normal">
                Delivery Details
              </div>
            </div>
            <div className="text-[#5D5D5E] text-sm font-normal font-['Inter'] leading-relaxed">
              {required
                ? "Please add your delivery address and contact number to continue checkout."
                : "Add your delivery address so we know where to send your orders."}
            </div>
          </div>

          {/* Fields */}
          <div className="self-stretch flex-col gap-3 flex w-full">
            <div className="self-stretch w-full p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
              <input
                type="text"
                placeholder="Street address / flat / building"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
                <input
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
                />
              </div>
              <div className="w-32 p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  maxLength={6}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] placeholder:text-[#8B8B8C]"
                />
              </div>
            </div>
            <div className="self-stretch w-full p-3 rounded-lg border border-[#D3D3D5] flex items-center focus-within:border-[#AE2534] transition-colors">
              <input
                type="tel"
                placeholder="Phone number (10 digits, optional)"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
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
          {!required && (
            <button
              onClick={onClose}
              className="h-[52px] px-6 py-2.5 rounded-full backdrop-blur-md justify-center items-center gap-1.5 flex hover:opacity-80 transition-opacity"
              style={{
                background: "linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
                outline: "1px solid #99001E",
              }}
            >
              <span className="text-[#99001E] text-sm font-medium font-['Inter'] leading-relaxed">Skip for now</span>
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={loading}
            className="h-[52px] px-6 py-2.5 bg-[#B84D62] hover:bg-[#99001E] transition-colors rounded-full justify-center items-center gap-1.5 flex cursor-pointer backdrop-blur-md disabled:opacity-60"
          >
            <span className="text-[rgba(248,248,251,0.9)] text-sm font-medium font-['Inter'] leading-relaxed">
              {loading ? "Saving..." : "Save Address"}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
