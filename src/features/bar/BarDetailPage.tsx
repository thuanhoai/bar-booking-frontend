import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { barApi } from "./services/barApi"
import type { Bar } from "./types"

import SEO from "../../components/SEO"
import BreadcrumbBar from "../blog/components/BreadcrumbBar"

import BarHeroSection from "./components/BarHeroSection"
import BarBookingModal from "./components/BarBookingModal"
import BarFAQ from "./components/BarFAQ"
import BarStickyBooking from "./components/BarStickyBooking"
import BarRelatedList from "./components/BarRelatedList"
import BarRecentlyViewed from "./components/BarRecentlyViewed"

import { barFaqs } from "./barFaq"
import { addRecentlyViewed } from "../../utils/recentlyViewed"

export default function BarDetailPage() {
    const { id } = useParams<{ id: string }>()

    const [bar, setBar] = useState<Bar | null>(null)
    const [loading, setLoading] = useState(true)
    const [showBooking, setShowBooking] = useState(false)
    const [showSticky, setShowSticky] = useState(false)

    /* ================= FETCH BAR ================= */
    useEffect(() => {
        if (!id) return

        setLoading(true)
        barApi
            .getBarById(Number(id))
            .then((data) => setBar(data ?? null))
            .finally(() => setLoading(false))
    }, [id])

    /* ================= RECENTLY VIEWED ================= */
    useEffect(() => {
        if (bar) addRecentlyViewed(bar)
    }, [bar])

    /* ================= STICKY CTA ================= */
    useEffect(() => {
        const onScroll = () => {
            setShowSticky(window.scrollY > 300)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    /* ================= RELATED BARS (TẠM TRỐNG) =================
       👉 Giai đoạn này chưa có API thì trả mảng rỗng
       👉 Sau này thay bằng API /bars?city=&exclude=
    */
    const relatedBars = useMemo<Bar[]>(() => {
        return []
    }, [])

    /* ================= STATES ================= */
    if (loading) return <p className="text-center my-5">Đang tải dữ liệu…</p>
    if (!bar) return <p className="text-center my-5">Không tìm thấy quán bar</p>

    return (
        <>
            {/* ================= SEO ================= */}
            <SEO
                title={`${bar.name} | Đặt bàn bar uy tín`}
                description={`${bar.name} tại ${bar.district}, ${bar.city}`}
                image={bar.image}
                url={`https://your-domain.com/bars/${bar.id}`}
            />

            {/* ================= BREADCRUMB ================= */}
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Danh sách bar", to: "/bars" },
                    { label: bar.name },
                ]}
            />

            {/* ================= HERO ================= */}
            <BarHeroSection
                bar={bar}
                onBook={() => setShowBooking(true)}
                showMobileCTA={!showSticky}
            />

            {/* ================= RELATED ================= */}
            {relatedBars.length > 0 && (
                <BarRelatedList bars={relatedBars} />
            )}

            {/* ================= RECENTLY VIEWED ================= */}
            <BarRecentlyViewed />

            {/* ================= STICKY BOOKING ================= */}
            {showSticky && bar.partnerStatus === "partner" && (
                <BarStickyBooking
                    bar={bar}
                    onBook={() => setShowBooking(true)}
                />
            )}

            {/* ================= FAQ ================= */}
            <section className="container my-5">
                <BarFAQ faqs={barFaqs} />
            </section>

            {/* ================= BOOKING MODAL ================= */}
            <BarBookingModal
                show={showBooking}
                bar={bar}
                onClose={() => setShowBooking(false)}
            />
        </>
    )
}
