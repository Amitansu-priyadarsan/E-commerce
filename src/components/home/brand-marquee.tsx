import { useNavigate } from "react-router-dom"
import ChanderiSaree from "@/assets/Hero/ChanderiSaree.png"
import MaheshwariSaree from "@/assets/Hero/Maheswari.png"
import KanchipuramSaree from "@/assets/Hero/Kanchipuram.png"
import BanarasiSaree from "@/assets/Hero/Banarasi.png"
import RajputiSaree from "@/assets/Hero/Rajputi.png"
import PoshakImage from "@/assets/Hero/Poshak.png"
import IndoWesternImage from "@/assets/Hero/Indowestern.png"
import LehengaImage from "@/assets/Hero/Lehenga.png"
import Lehenga2Image from "@/assets/Hero/Lehenga2.png"
import { HeartIcon } from "@/components/home/heart-icon"

const specialties = [
  { id: "saree-chanderi", name: "Chanderi Saree", image: ChanderiSaree },
  { id: "saree-maheshwari", name: "Maheshwari Saree", image: MaheshwariSaree },
  { id: "saree-kanchipuram", name: "Kanchipuram Saree", image: KanchipuramSaree },
  { id: "saree-banarasi", name: "Banarasi Saree", image: BanarasiSaree },
  { id: "saree-rajputi", name: "Rajputi Saree", image: RajputiSaree },
]

const productTypes = [
  { id: "type-saree", name: "Saree", image: KanchipuramSaree }, // Based on screenshot, maybe Kanchipuram is best fit for the "Saree" card
  { id: "type-lehenga", name: "Lehenga", image: LehengaImage },
  { id: "type-indo-western", name: "Indo Western", image: IndoWesternImage },
  { id: "type-poshak", name: "Poshak", image: PoshakImage },
  { id: "type-bridal-lehenga", name: "Bridal Lehenga", image: Lehenga2Image },
]

export function BrandMarquee() {
  const navigate = useNavigate()

  return (
    <section className="mt-16 flex flex-col items-center justify-center w-full px-4 sm:px-8">
      <div
        style={{
          color: "#AE2534",
          fontSize: "96px",
          fontFamily: "Italianno",
          fontWeight: 400,
          wordWrap: "break-word",
          lineHeight: "1"
        }}
        className="text-center"
      >
        43 Years of Trust
      </div>
      <div
        style={{
          color: "black",
          fontSize: "36px",
          fontFamily: "Joan",
          fontWeight: 400,
          wordWrap: "break-word",
          lineHeight: "1.2"
        }}
        className="mt-2 text-center"
      >
        Our Specialty
      </div>

      <div className="mt-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 pb-10 justify-items-center">
          {specialties.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer w-full rounded-lg overflow-hidden border border-black/5"
              onClick={() => {
                navigate(`/category/${item.id}`)
              }}
            >
              <div className="aspect-4/5 w-full overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 pb-6 text-center pointer-events-none flex flex-col items-center justify-end">
                <span className="font-serif text-2xl text-white font-medium drop-shadow-md leading-tight">
                  {item.name.split(' ').map((word, i) => (
                    <span key={i} className="block">{word}</span>
                  ))}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 w-full flex flex-col items-center justify-center text-center">
        <div style={{ color: "#AE2534", fontSize: "36px", fontFamily: "Joan", fontWeight: 400, wordWrap: "break-word" }}>
          Fashion Moment With Bahurani
        </div>
        <HeartIcon className="my-4" />
        <div style={{ color: "black", fontSize: "36px", fontFamily: "Joan", fontWeight: 400, wordWrap: "break-word" }}>
          Our Customers` satisfaction matters us the<br />   most
        </div>
      </div>

      <div className="mt-12 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-5 pb-10 justify-items-center">
          {productTypes.map((item) => (
            <div
              key={item.id}
              className="group relative cursor-pointer w-full rounded-lg overflow-hidden border border-black/5"
              onClick={() => {
                navigate(`/category/${item.id}`)
              }}
            >
              <div className="aspect-4/5 w-full overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-4 pb-6 text-center pointer-events-none flex flex-col items-center justify-end">
                <span className="font-serif text-2xl text-white font-medium drop-shadow-md leading-tight">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
