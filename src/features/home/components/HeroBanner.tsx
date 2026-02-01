import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import { barApi } from "../../bar/services/barApi"
import type { Bar } from "../../bar/types"

/* ======================
   TYPES
====================== */
interface CityItem {
    key: string
    label: string
    image: string
    count: number
}

/* ======================
   MAP ẢNH THEO CITY
====================== */
const DEFAULT_CITY_IMAGE =
    "https://i.pinimg.com/originals/39/8b/93/398b93fecfa9d75ae50c265c4f1cf4d7.jpg"
export default function HeroBanner() {
    const navigate = useNavigate()
    const [bars, setBars] = useState<Bar[]>([])
    const [loading, setLoading] = useState(true)

    /* ======================
       FETCH BAR
    ====================== */
    useEffect(() => {
        let mounted = true

        barApi.getBars().then((data) => {
            if (!mounted) return
            setBars(data)
            setLoading(false)
        })

        return () => {
            mounted = false
        }
    }, [])

    /* ======================
       TỰ SINH CITY TỪ BAR
    ====================== */
    const cities = useMemo<CityItem[]>(() => {
        const map = new Map<string, CityItem>()

        bars.forEach((bar) => {
            if (!bar.city) return

            if (!map.has(bar.city)) {
                map.set(bar.city, {
                    key: bar.city,
                    label: bar.city.toUpperCase(),
                    image: DEFAULT_CITY_IMAGE,
                    count: 0,
                })
            }

            map.get(bar.city)!.count += 1
        })

        return Array.from(map.values()).sort(
            (a, b) => b.count - a.count
        )
    }, [bars])

    const goToCity = (city: string) => {
        navigate(`/bars?city=${encodeURIComponent(city)}`)
    }

    if (loading || !cities.length) return null

    return (
        <section className="container my-4 hero-banner-section">
            <h2 className="fw-bold mb-3 mb-md-4">
                Khám phá Top địa điểm theo khu vực
            </h2>

            <Swiper
                modules={[Navigation]}
                navigation
                loop
                spaceBetween={16}
                slidesPerView={1.15}
                breakpoints={{
                    360: { slidesPerView: 1.1 },
                    480: { slidesPerView: 1.2 },
                    576: { slidesPerView: 1.4 },
                    768: { slidesPerView: 2 },
                    992: { slidesPerView: 2.4 },
                    1200: { slidesPerView: 3 },
                }}
                speed={600}
                resistanceRatio={0.6}
            >
                {cities.map((city) => (
                    <SwiperSlide key={city.key}>
                        <div
                            className="city-banner"
                            role="button"
                            tabIndex={0}
                            onClick={() => goToCity(city.key)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && goToCity(city.key)
                            }
                        >
                            <img
                                src={city.image}
                                alt={city.label}
                                loading="lazy"
                            />

                            <div className="city-overlay">
                                <span className="city-count">
                                    {city.count} địa điểm
                                </span>

                                <h3>{city.label}</h3>

                                <span className="city-hotline">
                                    Hotline: 0868.460.008
                                </span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}
