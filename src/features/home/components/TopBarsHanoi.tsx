import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { barApi } from "../../bar/services/barApi"
import type { Bar } from "../../bar/types"
import { Loading } from "../../../components/Loading"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

/* ======================
   EXTEND BAR TYPE
====================== */
interface RankedBar extends Bar {
    rank: number
}

export default function TopBarsHanoi() {
    const [bars, setBars] = useState<RankedBar[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        let mounted = true

        barApi.getBars().then((data) => {
            if (!mounted) return

            const hanoiBars: RankedBar[] = data
                .filter(bar => bar.city === "Hà Nội")
                .sort((a, b) => {
                    if (a.partnerStatus === "partner" && b.partnerStatus !== "partner") return -1
                    if (b.partnerStatus === "partner" && a.partnerStatus !== "partner") return 1
                    return (b.rating ?? 0) - (a.rating ?? 0)
                })
                .slice(0, 10)
                .map((bar, i) => ({
                    ...bar,
                    rank: i + 1,
                }))

            setBars(hanoiBars)
            setLoading(false)
        })

        return () => {
            mounted = false
        }
    }, [])

    if (loading) return <Loading />

    if (!bars.length) {
        return (
            <div className="text-center my-5 text-muted">
                Chưa có quán bar nổi bật tại Hà Nội
            </div>
        )
    }

    return (
        <section className="container my-5">
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="fw-bold mb-0">
                    ⭐ Top quán bar ở Hà Nội
                </h2>

                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate("/bars?city=Hà Nội")}
                >
                    Xem tất cả
                </button>
            </div>

            {/* ===== SWIPER RESPONSIVE ===== */}
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
                    1200: { slidesPerView: 4 }, // desktop luôn 4
                }}
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
                                    style={{
                                        background: "#2b2b2b",
                                        borderRadius: 12,
                                        overflow: "hidden",
                                        boxShadow: isPartner
                                            ? "0 0 0 1px rgba(255,183,3,.6)"
                                            : "0 3px 12px rgba(0,0,0,.28)",
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

                                        {/* RANK */}
                                        <span
                                            className={`badge ${bar.rank === 1
                                                ? "bg-danger"
                                                : "bg-warning text-dark"
                                                }`}
                                            style={{
                                                position: "absolute",
                                                top: 6,
                                                left: 6,
                                                fontSize: 10,
                                                padding: "3px 6px",
                                            }}
                                        >
                                            #{bar.rank}
                                        </span>

                                        {/* PARTNER MINI */}
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

                                    {/* CONTENT — compact */}
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
