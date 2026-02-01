import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Bar } from "../types"

import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode } from "swiper/modules"

import { getRecentlyViewed } from "../../../utils/recentlyViewed"

export default function BarRecentlyViewedSticky() {
    const [bars, setBars] = useState<Bar[]>([])

    useEffect(() => {
        const data = getRecentlyViewed()
        if (Array.isArray(data)) {
            setBars(data.slice(0, 10))
        }
    }, [])

    if (!bars.length) return null

    return (
        <div className="recently-sticky d-md-none">
            <div className="recently-sticky-title">
                🕒 Vừa xem
            </div>

            <Swiper
                modules={[FreeMode]}
                freeMode
                spaceBetween={10}
                slidesPerView={1.8}
                breakpoints={{
                    360: { slidesPerView: 1.6 },
                    400: { slidesPerView: 1.8 },
                    480: { slidesPerView: 2.2 },
                    576: { slidesPerView: 2.6 },
                    640: { slidesPerView: 3 },
                }}
                resistanceRatio={0.6}
            >
                {bars.map((bar) => {
                    const image =
                        bar.image ||
                        bar.images?.[0] ||
                        "/placeholder-bar.jpg"

                    return (
                        <SwiperSlide key={bar.id}>
                            <Link
                                to={`/bars/${bar.id}`}
                                className="text-white text-decoration-none"
                            >
                                <div className="recently-card">
                                    <div className="recently-image">
                                        <img
                                            src={image}
                                            alt={bar.name}
                                            loading="lazy"
                                        />

                                        {bar.partnerStatus === "partner" && (
                                            <span className="recently-badge">
                                                ✔ Đối tác
                                            </span>
                                        )}
                                    </div>

                                    <div className="recently-name">
                                        {bar.name}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </div>
    )
}
