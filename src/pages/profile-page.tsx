import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/auth-context"
import { profileApi } from "@/services/api"
import type { ApiProfile } from "@/services/api"
import { FaUserCircle } from "react-icons/fa"
import { Mail, Phone, Calendar, LogOut, Package } from "lucide-react"

export function ProfilePage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [profile, setProfile] = useState<ApiProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true })
      return
    }
    profileApi
      .getMe()
      .then((res) => setProfile(res.data))
      .catch(() => setError("Failed to load profile. Please try again."))
      .finally(() => setLoading(false))
  }, [user, navigate])

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold uppercase tracking-[0.18em] text-center mb-8 text-zinc-900">
          My Profile
        </h1>

        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#AE2534] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-[#AE2534] text-sm font-medium">{error}</div>
        )}

        {profile && !loading && (
          <div className="bg-white rounded-[28px] shadow-sm border border-zinc-100 overflow-hidden">
            {/* Header banner */}
            <div
              className="h-24 w-full"
              style={{
                background: "linear-gradient(90deg, #AE2534 0%, #480F16 19%, #62151D 34%, #7B1A25 90%)",
              }}
            />

            {/* Avatar */}
            <div className="flex flex-col items-center -mt-10 px-6 pb-6">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center">
                <FaUserCircle className="w-[72px] h-[72px] text-[#AE2534]" />
              </div>

              <h2 className="mt-3 text-xl font-bold text-zinc-900">
                {profile.full_name ?? "No name set"}
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">{profile.email}</p>

              {/* Divider */}
              <div className="w-full h-px bg-zinc-100 my-6" />

              {/* Info rows */}
              <div className="w-full flex flex-col gap-4">
                <InfoRow
                  icon={<Mail className="h-4 w-4 text-[#AE2534]" />}
                  label="Email"
                  value={profile.email}
                />
                <InfoRow
                  icon={<Phone className="h-4 w-4 text-[#AE2534]" />}
                  label="Phone"
                  value={profile.phone_number ?? "Not provided"}
                  muted={!profile.phone_number}
                />
                {profile.created_at && (
                  <InfoRow
                    icon={<Calendar className="h-4 w-4 text-[#AE2534]" />}
                    label="Member since"
                    value={formatDate(profile.created_at)}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs">
                <button
                  onClick={() => navigate("/orders")}
                  className="flex w-full items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#AE2534] text-white text-sm font-semibold hover:bg-[#8e1e2a] transition-colors"
                >
                  <Package className="h-4 w-4" />
                  Your Orders
                </button>
                <button
                  onClick={() => { logout(); navigate("/") }}
                  className="flex w-full items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#AE2534] text-[#AE2534] text-sm font-semibold hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  muted = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 border border-zinc-100">
      <div className="shrink-0">{icon}</div>
      <div className="flex flex-col min-w-0">
        <span className="text-[11px] text-zinc-400 uppercase tracking-wide font-medium">{label}</span>
        <span className={`text-sm font-medium truncate ${muted ? "text-zinc-400" : "text-zinc-800"}`}>
          {value}
        </span>
      </div>
    </div>
  )
}
