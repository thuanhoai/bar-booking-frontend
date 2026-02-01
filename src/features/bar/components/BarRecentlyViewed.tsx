import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import type { Bar } from "../types"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import { getRecentlyViewed } from "../../../utils/recentlyViewed"

export default function BarRecentlyViewed() {
    const [bars, setBars] = useState<Bar[]>([])

    useEffect(() => {
        setBars(getRecentlyViewed())
    }, [])

    if (!bars.length) return null

    return (
        <section className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold mb-0">
                    🕒 Quán bar vừa xem
                </h2>
            </div>

            <Swiper
                modules={[Navigation]}
                navigation
                loop
                spaceBetween={10}
                slidesPerView={2.2}
                breakpoints={{
                    360: { slidesPerView: 2.2 },
                    480: { slidesPerView: 2.6 },
                    576: { slidesPerView: 3 },
                    768: { slidesPerView: 3.5 },
                    992: { slidesPerView: 4 },
                    1200: { slidesPerView: 4 }, // desktop giữ 4
                }}
                speed={550}
                watchSlidesProgress
                resistanceRatio={0.6}
            >
                {bars.map((bar) => {
                    const isPartner = bar.partnerStatus === "partner"

                    return (
                        <SwiperSlide key={bar.id}>
                            <Link
                                to={`/bars/${bar.id}`}
                                className="text-decoration-none text-white"
                            >
                                <div
                                    className="h-100"
                                    style={{
                                        background: "#2b2b2b",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        boxShadow: isPartner
                                            ? "0 0 0 1px rgba(255,183,3,.6)"
                                            : "0 3px 12px rgba(0,0,0,.28)",
                                        transition: "transform .15s ease",
                                    }}
                                >
                                    {/* IMAGE — thấp hơn để card nhỏ */}
                                    <div className="bar-image-wrapper">

                                        <img
                                            src={bar.image || "/placeholder.jpg"}
                                            alt={bar.name}
                                            loading="lazy"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                display: "block",
                                            }}
                                        />

                                        {/* PARTNER MINI BADGE */}
                                        {isPartner && (
                                            <span
                                                style={{
                                                    position: "absolute",
                                                    bottom: 6,
                                                    left: 6,
                                                    background:
                                                        "linear-gradient(135deg,#ffb703,#ffd166)",
                                                    color: "#000",
                                                    padding: "2px 7px",
                                                    fontSize: 9,
                                                    borderRadius: 999,
                                                    fontWeight: 700,
                                                }}
                                            >
                                                9Life
                                            </span>
                                        )}
                                    </div>

                                    {/* CONTENT — COMPACT */}
                                    <div style={{ padding: 6 }}>
                                        <div
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 600,
                                                marginBottom: 2,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {bar.name}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 10,
                                                color: "#aaa",
                                                marginBottom: 3,
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                            }}
                                        >
                                            {bar.district}, {bar.city}
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <span
                                                style={{ fontSize: 10 }}
                                                className="text-warning"
                                            >
                                                ⭐ {bar.rating}
                                            </span>

                                            <span
                                                style={{
                                                    background: "#3a3a3a",
                                                    padding: "2px 6px",
                                                    borderRadius: 999,
                                                    fontSize: 9,
                                                    textTransform: "capitalize",
                                                }}
                                            >
                                                {bar.type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </section>
    )
}
