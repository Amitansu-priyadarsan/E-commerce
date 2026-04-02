import { X, Smartphone, Mail, ArrowLeft, Pencil } from "lucide-react"
import { useState } from "react"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  authMode?: "signin" | "signup"
}

export function LoginModal({ isOpen, onClose, authMode = "signin" }: LoginModalProps) {
  const [loginMethod, setLoginMethod] = useState<"mobile" | "email">("email")
  const [step, setStep] = useState<"contact" | "otp" | "name">("contact")
  const [contactValue, setContactValue] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div 
        className="w-full max-w-[460px] pt-16 pb-6 relative bg-white rounded-2xl flex flex-col justify-start items-start gap-14 shadow-xl"
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

        {step === "contact" && (
          <>
            <div className="self-stretch px-6 flex-col justify-start items-start gap-8 flex">
              {/* Tabs */}
              <div 
                className="h-12 p-1.5 rounded-full flex justify-start items-center gap-2 sm:gap-5 w-full flex-wrap sm:flex-nowrap"
                style={{ 
                  background: "linear-gradient(180deg, rgba(248, 248, 251, 0.60) 0%, white 50%, white 100%)",
                  outline: "1.75px solid white"
                }}
              >
                <button 
                  onClick={() => setLoginMethod("mobile")}
                  className={`flex-1 min-w-[100px] sm:w-[192px] h-9 px-2 sm:px-3 py-2.5 rounded-full justify-center items-center gap-1.5 flex transition-all ${
                    loginMethod === "mobile" 
                      ? "bg-white shadow-[1px_2px_4px_#ECECEE] text-[#121214] outline-1 outline-[#F8F8FB]" 
                      : "text-[#8B8B8C] hover:text-[#454547]"
                  }`}
                >
                  <Smartphone className="w-[14px] h-[14px] opacity-70" />
                  <span className="text-sm font-normal font-['Inter'] leading-relaxed">Mobile</span>
                </button>
                <button 
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 min-w-[100px] sm:w-[192px] h-9 px-2 sm:px-3 py-2.5 rounded-full justify-center items-center gap-1.5 flex transition-all ${
                    loginMethod === "email" 
                      ? "bg-white shadow-[1px_2px_4px_#ECECEE] text-[#121214] outline-1 outline-[#F8F8FB]" 
                      : "text-[#8B8B8C] hover:text-[#454547]"
                  }`}
                >
                  <Mail className="w-[14px] h-[14px] opacity-70" />
                  <span className="text-sm font-normal font-['Inter'] leading-relaxed">Email</span>
                </button>
              </div>

              {/* Content */}
              <div className="self-stretch flex-col justify-start items-start gap-6 flex">
                <div className="self-stretch pr-4 sm:pr-8 flex-col justify-start items-start gap-0.5 flex">
                  <div className="self-stretch text-[#121214] text-base font-semibold font-['Inter'] leading-normal">
                    {authMode === "signup" ? "Create your account" : "Sign in to your account"}
                  </div>
                  <div className="self-stretch text-[#5D5D5E] text-sm font-normal font-['Inter'] leading-relaxed">
                    {authMode === "signup"
                      ? "Enter your details to get started with orders, loyalty rewards & more"
                      : "We need your contact number or email address to send you updates on orders, enroll for loyalty & many more"}
                  </div>
                </div>

                <div className="self-stretch flex-1 rounded flex-col justify-start items-start gap-4 flex w-full">
                  <div className="self-stretch w-full flex-1 p-3 rounded-lg border border-[#D3D3D5] justify-start items-center gap-3 inline-flex focus-within:border-[#AE2534] transition-colors">
                    <input 
                      type={loginMethod === "email" ? "email" : "tel"}
                      placeholder={`Enter your ${loginMethod === "email" ? "email address" : "mobile number"}`}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] leading-relaxed placeholder:text-[#8B8B8C]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="self-stretch px-5 justify-end items-center gap-4 inline-flex">
              <button 
                onClick={() => {
                  onClose()
                  setStep("contact")
                }}
                className="h-[52px] px-6 py-2.5 rounded-full backdrop-blur-md justify-center items-center gap-1.5 flex hover:opacity-80 transition-opacity"
                style={{ 
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
                  outline: "1px solid #99001E" 
                }}
              >
                <span className="text-[#99001E] text-sm font-medium font-['Inter'] leading-relaxed">Cancel</span>
              </button>
              <button 
                onClick={() => setStep("otp")}
                className="h-[52px] px-6 py-2.5 bg-[#B84D62] hover:bg-[#99001E] transition-colors rounded-full justify-center items-center gap-1.5 flex cursor-pointer backdrop-blur-md"
              >
                <span className="text-[rgba(248,248,251,0.9)] text-sm font-medium font-['Inter'] leading-relaxed">Continue</span>
              </button>
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <div className="self-stretch px-6 flex-col justify-start items-start gap-7 flex w-full">
              <div className="self-stretch justify-start items-start gap-3 inline-flex w-full">
                <button
                  onClick={() => setStep("contact")}
                  className="w-10 h-10 rounded-full flex justify-center items-center backdrop-blur-md hover:bg-black/5 transition-colors shrink-0"
                  style={{
                    background: "rgba(248, 248, 251, 0.20)",
                    outline: "1.50px solid white"
                  }}
                >
                  <ArrowLeft className="w-5 h-5 text-[#454547]" />
                </button>
                <div className="flex-1 pr-8 flex-col justify-start items-start gap-0.5 inline-flex w-full">
                  <div className="self-stretch text-[#121214] text-base font-semibold font-['Inter'] leading-normal">
                    Verify your {loginMethod}
                  </div>
                  <div className="justify-start items-center gap-2.5 inline-flex flex-wrap">
                    <span className="text-[#5D5D5E] text-sm font-normal font-['Inter'] leading-relaxed">
                      Ding! We’ve sent a code to <span className="text-[#121214] font-medium">{contactValue || (loginMethod === 'email' ? 'your email' : 'your number')}</span>
                    </span>
                    <button 
                      onClick={() => setStep("contact")}
                      className="w-6 h-6 rounded-full flex justify-center items-center"
                      style={{
                        background: "linear-gradient(147deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
                        outline: "0.90px solid #F8F8FB"
                      }}
                    >
                      <Pencil className="w-3 h-3 text-[#99001E]" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-between items-start gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="flex-1 aspect-7/8 max-w-[56px] rounded-lg border border-[#D3D3D5] flex justify-center items-center focus-within:border-[#99001E] transition-colors"
                  >
                    <input 
                      type="text" 
                      maxLength={1}
                      className="w-full h-full text-center bg-transparent outline-none text-[#121214] text-sm font-medium font-['Inter'] leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              <div className="justify-start items-center gap-1 inline-flex">
                <div className="text-[#5D5D5E] text-xs font-medium font-['Inter'] leading-none tracking-wide">Resend code in</div>
                <div className="text-[#8B8B8C] text-xs font-normal font-['Inter'] leading-none tracking-wide">00:28</div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="self-stretch px-5 justify-end items-center gap-4 inline-flex">
              <button 
                onClick={() => {
                  onClose()
                  setStep("contact")
                }}
                className="h-[52px] px-6 py-2.5 rounded-full backdrop-blur-md justify-center items-center gap-1.5 flex hover:opacity-80 transition-opacity"
                style={{ 
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
                  outline: "1px solid #99001E" 
                }}
              >
                <span className="text-[#99001E] text-sm font-medium font-['Inter'] leading-relaxed">Cancel</span>
              </button>
              <button 
                onClick={() => setStep("name")}
                className="h-[52px] px-6 py-2.5 bg-[#B84D62] hover:bg-[#99001E] transition-colors rounded-full justify-center items-center gap-1.5 flex cursor-pointer backdrop-blur-md"
              >
                <span className="text-[rgba(248,248,251,0.9)] text-sm font-medium font-['Inter'] leading-relaxed">Verify</span>
              </button>
            </div>
          </>
        )}

        {step === "name" && (
          <>
            <div className="self-stretch px-6 flex-col justify-start items-start gap-7 flex">
              <div className="self-stretch pr-8 flex-col justify-start items-start gap-0.5 flex">
                <div className="self-stretch text-[#121214] text-base font-semibold font-['Inter'] leading-normal">
                  How would you like us to call you?
                </div>
              </div>

              <div className="self-stretch flex-1 rounded flex-col justify-start items-start gap-4 flex w-full">
                <div className="self-stretch w-full flex-1 p-3 rounded-lg border border-[#D3D3D5] justify-start items-center gap-3 inline-flex focus-within:border-[#AE2534] transition-colors">
                  <input 
                    type="text"
                    placeholder="Enter your name here"
                    className="w-full bg-transparent outline-none text-[#121214] text-sm font-normal font-['Inter'] leading-relaxed placeholder:text-[#8B8B8C]"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="self-stretch px-5 justify-end items-center gap-4 inline-flex">
              <button 
                onClick={() => {
                  onClose()
                  setStep("contact")
                }}
                className="h-[52px] px-6 py-2.5 rounded-full backdrop-blur-md justify-center items-center gap-1.5 flex hover:opacity-80 transition-opacity"
                style={{ 
                  background: "linear-gradient(90deg, rgba(255, 255, 255, 0.50) 0%, #ECECEE 100%)",
                  outline: "1px solid #99001E" 
                }}
              >
                <span className="text-[#99001E] text-sm font-medium font-['Inter'] leading-relaxed">Cancel</span>
              </button>
              <button 
                onClick={() => {
                  onClose()
                  setStep("contact")
                }}
                className="h-[52px] px-6 py-2.5 bg-[#B84D62] hover:bg-[#99001E] transition-colors rounded-full justify-center items-center gap-1.5 flex cursor-pointer backdrop-blur-md"
              >
                <span className="text-[rgba(248,248,251,0.9)] text-sm font-medium font-['Inter'] leading-relaxed">Let's Go</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
