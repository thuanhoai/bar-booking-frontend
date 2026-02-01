import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { barApi } from "./services/barApi"
import type { Bar } from "./types"

import SEO from "../../components/SEO"
import BarHeroSection from "./components/BarHeroSection"
import BarGallery from "./components/BarGallery"
import BarBookingModal from "./components/BarBookingModal"
import BarFAQ from "./components/BarFAQ"
import BarStickyBooking from "./components/BarStickyBooking"
import BarMap from "./components/BarMap"

import { barFaqs } from "./barFaq"
import { barReviews } from "./barReviews"

import BarRatingSummary from "./components/BarRatingSummary"
import BarReviewList from "./components/BarReviewList"
import BarRelatedList from "./components/BarRelatedList"
import BarRecentlyViewed from "./components/BarRecentlyViewed"

import { addRecentlyViewed } from "../../utils/recentlyViewed"
import { mockBars } from "../../services/mockBars"
import BreadcrumbBar from "../blog/components/BreadcrumbBar"

export default function BarDetailPage() {
    const { id } = useParams<{ id: string }>()
    const [bar, setBar] = useState<Bar | null>(null)
    const [showBooking, setShowBooking] = useState(false)
    const [showSticky, setShowSticky] = useState(false)
    const [loading, setLoading] = useState(true)

    /** Fetch bar detail */
    useEffect(() => {
        if (!id) return

        barApi.getBarById(Number(id)).then((data) => {
            setBar(data ?? null)
            setLoading(false)
        })
    }, [id])

    /** Save recently viewed */
    useEffect(() => {
        if (bar) addRecentlyViewed(bar)
    }, [bar])

    /** Sticky CTA logic */
    useEffect(() => {
        const onScroll = () => {
            setShowSticky(window.scrollY > 300)
        }

        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    /** ✅ FIX: chừa chỗ cho sticky */


    /** Related bars */
    const relatedBars = useMemo(() => {
        if (!bar) return []

        return mockBars
            .filter(b => b.id !== bar.id && b.city === bar.city)
            .sort((a, b) => {
                if (a.type === bar.type) return -1
                if (b.type === bar.type) return 1
                return b.rating - a.rating
            })
            .slice(0, 6)
    }, [bar])

    if (loading) return <p>Đang tải dữ liệu...</p>
    if (!bar) return <p>Không tìm thấy quán bar</p>

    return (
        <>
            {/* SEO */}
            <SEO
                title={`${bar.name} | Đặt bàn bar uy tín`}
                description={`${bar.name} tại ${bar.district}, ${bar.city}. Đánh giá ${bar.rating}/5.`}
                image={bar.image}
                url={`https://your-domain.com/bars/${bar.id}`}
            />
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Danh sách", to: "/bars" },
                    { label: bar.name }
                ]}
            />
            {/* HERO */}
            <BarHeroSection
                bar={bar}
                onBook={() => setShowBooking(true)}
                showMobileCTA={!showSticky}
            />

            {/* GALLERY */}


            {/* DESCRIPTION */}


            {/* REVIEWS */}


            {/* MAP */}


            {/* RELATED */}
            <BarRelatedList bars={relatedBars} />

            {/* RECENTLY VIEWED */}
            <BarRecentlyViewed />
            {!showSticky && <BarRecentlyViewed />}

            {/* STICKY BOOKING */}
            {showSticky && (<BarStickyBooking bar={bar} onBook={() => { if (bar.partnerStatus === "partner") { setShowBooking(true) } }} />)}
            {/* FAQ */}
            <section className="container my-5">
                <BarFAQ faqs={barFaqs} />
            </section>



            {/* MODAL */}
            <BarBookingModal
                show={showBooking}
                onClose={() => setShowBooking(false)}
                bar={bar}
            />
        </>
    )
}
