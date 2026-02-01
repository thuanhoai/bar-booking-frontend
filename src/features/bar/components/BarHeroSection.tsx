import { useEffect, useMemo, useState } from "react"
import type { Bar } from "../types"

interface Props {
    bar: Bar
    onBook: () => void
    showMobileCTA: boolean
}

export default function BarHeroSection({
    bar,
    onBook,
    showMobileCTA,
}: Props) {

    /* ===== GALLERY MERGE ===== */
    const gallery = useMemo(() => {
        const imgs = [
            bar.image,
            ...(bar.gallery ?? []),
            ...(bar.images ?? []),
        ]
        return Array.from(new Set(imgs)).filter(Boolean)
    }, [bar.image, bar.gallery, bar.images])

    const [activeImage, setActiveImage] = useState<string | undefined>(
        gallery[0]
    )

    useEffect(() => {
        setActiveImage(gallery[0])
    }, [gallery])

    if (!activeImage) return null

    /* ===== GOOGLE MAP EMBED ===== */
    const mapSrc =
        bar.lat && bar.lng
            ? `https://www.google.com/maps?q=${bar.lat},${bar.lng}&z=15&output=embed`
            : `https://www.google.com/maps?q=${encodeURIComponent(bar.address)}&output=embed`

    return (
        <section className="container my-4">

            <div className="row g-4">

                {/* ================= LEFT CONTENT ================= */}
                <div className="col-12 col-lg-8">

                    {/* IMAGE */}
                    <div className="hero-image-wrapper mb-3">
                        <img
                            src={activeImage}
                            alt={bar.name}
                            className="hero-image"
                        />
                    </div>

                    {/* THUMBS */}
                    <div className="hero-thumbs">
                        {gallery.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                onClick={() => setActiveImage(img)}
                                className={`hero-thumb ${activeImage === img ? "active" : ""}`}
                            />
                        ))}
                    </div>

                    {/* TITLE */}
                    <h1 className="fw-bold mt-3">{bar.name}</h1>
                    <p className="text-muted">📍 {bar.address}</p>

                    {/* BADGES */}
                    <div className="d-flex gap-2 mb-3">
                        <span className="badge border text-white">
                            {bar.type}
                        </span>

                        {bar.partnerStatus === "partner" && (
                            <span className="badge bg-warning text-dark">
                                ✔ Đối tác 9Life
                            </span>
                        )}
                    </div>

                    {/* ===== DESCRIPTION ===== */}
                    <div className="bar-description-card">
                        <h5>Giới thiệu</h5>
                        <p>{bar.description}</p>
                    </div>

                    {/* ===== MAP ===== */}
                    <div className="bar-map-card">
                        <h5>Vị trí</h5>

                        <iframe
                            src={mapSrc}
                            width="100%"
                            height="260"
                            loading="lazy"
                            style={{ border: 0, borderRadius: 12, }}
                        />
                    </div>

                </div>

                {/* ================= RIGHT SIDEBAR ================= */}
                <div className="col-12 col-lg-4">
                    <div className="bar-sidebar-sticky">

                        <div className="booking-card">

                            <h5 className="fw-bold mb-3">
                                Đặt chỗ nhanh
                            </h5>

                            {bar.partnerStatus === "partner" ? (
                                <>
                                    <button
                                        className="btn btn-primary w-100 py-2 fw-semibold mb-3"
                                        onClick={onBook}
                                    >
                                        📅 Đặt bàn ngay
                                    </button>

                                    <div className="booking-divider">
                                        hoặc gọi
                                    </div>

                                    <a
                                        href={`tel:${bar.phone ?? "0868460008"}`}
                                        className="booking-phone"
                                    >
                                        📞 {bar.phone ?? "0868 460 008"}
                                    </a>
                                </>
                            ) : (
                                <>
                                    <button
                                        className="btn btn-outline-secondary w-100 py-2 mb-3"
                                        disabled
                                    >
                                        🚫 Chưa hợp tác
                                    </button>

                                    <div className="small text-white text-center">
                                        Quán chưa hỗ trợ đặt bàn online hoặc liên hệ
                                        số 080000 để được hỗ trợ
                                    </div>
                                </>
                            )}

                            {/* OPENING HOURS */}
                            <div className="booking-section">
                                <h6 className="fw-semibold mb-2">
                                    Giờ hoạt động
                                </h6>

                                <ul className="opening-hours">
                                    {(bar.openingHours ?? []).map((h, i) => (
                                        <li key={i}>
                                            <span>{h.day}</span>
                                            <span>{h.open} – {h.close}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}
