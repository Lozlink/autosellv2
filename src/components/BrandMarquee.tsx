import Image from "next/image"
import Link from "next/link";

const BRANDS = [
  "Toyota",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "BMW",
  "Mercedes",
  "Audi",
] as const

const brandLogo = (brand: string) => {
  const map: Record<string, string> = {
    Toyota: "/car-brand-logos/toyota.png",
    Ford: "/car-brand-logos/ford.png",
    Honda: "/car-brand-logos/honda.png",
    Hyundai: "/car-brand-logos/hyundai.png",
    Kia: "/car-brand-logos/kia.png",
    BMW: "/car-brand-logos/bmw.png",
    Mercedes: "/car-brand-logos/mercedes.png",
    Audi: "/car-brand-logos/Audi.png",
  }
  return map[brand] || "/car-brand-logos/toyota.png"
}

export default function BrandMarquee() {
  // Duplicate list to create seamless loop
  const items = [...BRANDS, ...BRANDS]

  return (
    <div className="relative overflow-hidden">

      <div className="marquee flex items-center gap-10">
        {items.map((brand, idx) => (
          <Link
            key={`${brand}-${idx}`}
            href={`/sell-${brand.toLowerCase()}`}
            className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
            aria-label={`Go to ${brand} brand page`}
          >
            <Image
              src={brandLogo(brand)}
              alt={`${brand} logo`}
              width={140}
              height={60}
              className="object-contain max-h-[60px]"
              loading="lazy"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
