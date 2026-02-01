import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"

import { barApi } from "./services/barApi"
import type { Bar } from "./types"
import BarCard from "./components/BarCard"
import BarCardSkeleton from "./components/BarCardSkeleton"
import { Loading } from "../../components/Loading"
import { useDebounce } from "../../hooks/useDebounce"
import BreadcrumbBar from "../blog/components/BreadcrumbBar"

const PAGE_SIZE = 6

/* ================= CONSTANTS ================= */

const BAR_TYPES = [
    { label: "Karaoke", value: "karaoke" },
    { label: "Club", value: "club" },
    { label: "Lounge", value: "lounge" },
    { label: "Rooftop", value: "rooftop" },
] as const

type SortValue = "" | "rating" | "popular"

export default function BarListPage() {
    const [bars, setBars] = useState<Bar[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const [showMobileFilter, setShowMobileFilter] = useState(false)

    const loadMoreRef = useRef<HTMLDivElement | null>(null)
    const [searchParams, setSearchParams] = useSearchParams()

    /* ================= FILTER FROM URL ================= */

    const rawFilters = useMemo(
        () => ({
            keyword: searchParams.get("keyword") || "",
            city: searchParams.get("city") || "",
            district: searchParams.get("district") || "",
            type: searchParams.get("type") || "",
            sort: (searchParams.get("sort") || "") as SortValue,
            partner: searchParams.get("partner") || "",
        }),
        [searchParams]
    )

    const filters = useDebounce(rawFilters, 300)

    const updateParam = (key: string, value?: string) => {
        const params = new URLSearchParams(searchParams)
        if (!value) params.delete(key)
        else params.set(key, value)
        setSearchParams(params)
    }

    /* ================= FETCH ================= */

    useEffect(() => {
        setLoading(true)
        barApi.getBars().then((data) => {
            setBars(data)
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setVisibleCount(PAGE_SIZE)
    }, [filters])

    /* ================= FILTER + SORT ================= */

    const filteredBars = useMemo(() => {
        let list = [...bars]
        // 🔍 KEYWORD SEARCH
        if (filters.keyword) {
            const q = filters.keyword.toLowerCase()
            list = list.filter((bar) =>
                bar.name.toLowerCase().includes(q) ||
                bar.address.toLowerCase().includes(q) ||
                bar.city.toLowerCase().includes(q) ||
                bar.district.toLowerCase().includes(q)
            )
        }
        // FILTER
        list = list.filter((bar) => {
            if (filters.city && bar.city !== filters.city) return false
            if (filters.district && bar.district !== filters.district)
                return false
            if (filters.type && bar.type !== filters.type) return false

            // 🔥 PARTNER FILTER
            if (filters.partner) {
                if (bar.partnerStatus !== filters.partner) return false
            }

            return true
        })

        // SORT
        if (filters.sort === "rating") {
            list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
        }

        if (filters.sort === "popular") {
            list.sort(
                (a, b) =>
                    (b.bookingCount ?? 0) - (a.bookingCount ?? 0)
            )
        }

        return list
    }, [bars, filters])

    const visibleBars = useMemo(
        () => filteredBars.slice(0, visibleCount),
        [filteredBars, visibleCount]
    )

    const hasMore = visibleCount < filteredBars.length

    /* ================= AUTO LOAD MORE ================= */

    useEffect(() => {
        if (!hasMore) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !loadingMore) {
                    setLoadingMore(true)
                    setTimeout(() => {
                        setVisibleCount((prev) => prev + PAGE_SIZE)
                        setLoadingMore(false)
                    }, 400)
                }
            },
            { threshold: 0.6 }
        )

        if (loadMoreRef.current) observer.observe(loadMoreRef.current)
        return () => observer.disconnect()
    }, [hasMore, loadingMore])

    if (loading) return <Loading />

    /* ================= RENDER ================= */

    return (
        <div className="container my-4 barlist-layout">
            {/* ===== BREADCRUMB ===== */}
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Danh sách", to: "/bars" },

                ]}
            />
            {rawFilters.keyword && (
                <div className="alert alert-secondary py-2 mb-3">
                    🔍 Kết quả cho từ khóa: <strong>{rawFilters.keyword}</strong>
                </div>
            )}

            <div className="row g-4">
                {/* ================= SIDEBAR ================= */}
                <aside className="col-md-3 d-none d-md-block">
                    <div className="filter-box sticky-top p-3 rounded">
                        {/* CITY */}
                        <h6 className="fw-bold mb-2">Tỉnh / Thành phố</h6>
                        <select
                            className="form-select mb-3"
                            value={rawFilters.city}
                            onChange={(e) =>
                                updateParam(
                                    "city",
                                    e.target.value || undefined
                                )
                            }
                        >
                            <option value="">Tất cả</option>
                            <option value="Hà Nội">Hà Nội</option>
                            <option value="HCM">HCM</option>
                            <option value="Đà Nẵng">Đà Nẵng</option>
                        </select>

                        {/* TYPE */}
                        <h6 className="fw-bold mb-2">Loại hình</h6>
                        {BAR_TYPES.map((item) => (
                            <div
                                key={item.value}
                                className="form-check mb-2"
                            >
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="type"
                                    checked={
                                        rawFilters.type === item.value
                                    }
                                    onChange={() =>
                                        updateParam("type", item.value)
                                    }
                                />
                                <label className="form-check-label">
                                    {item.label}
                                </label>
                            </div>
                        ))}

                        {/* PARTNER STATUS */}
                        <h6 className="fw-bold mt-4 mb-2">
                            Tình trạng hợp tác
                        </h6>

                        <div className="form-check mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={rawFilters.partner === "partner"}
                                onChange={(e) =>
                                    updateParam(
                                        "partner",
                                        e.target.checked
                                            ? "partner"
                                            : undefined
                                    )
                                }
                            />
                            <label className="form-check-label">
                                Đã hợp tác
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={
                                    rawFilters.partner === "non-partner"
                                }
                                onChange={(e) =>
                                    updateParam(
                                        "partner",
                                        e.target.checked
                                            ? "non-partner"
                                            : undefined
                                    )
                                }
                            />
                            <label className="form-check-label">
                                Chưa hợp tác
                            </label>
                        </div>

                        {(rawFilters.city ||
                            rawFilters.type ||
                            rawFilters.partner) && (
                                <button
                                    className="btn btn-sm btn-outline-secondary mt-3 w-100"
                                    onClick={() => setSearchParams({})}
                                >
                                    Xóa bộ lọc
                                </button>
                            )}
                    </div>
                </aside>

                {/* ================= CONTENT ================= */}
                <main className="col-md-9">
                    {/* ===== HEADER ===== */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-semibold">
                            Có {filteredBars.length} địa điểm phù hợp
                        </span>

                        {/* DESKTOP SORT */}
                        <select
                            className="form-select w-auto d-none d-md-block"
                            value={rawFilters.sort}
                            onChange={(e) =>
                                updateParam("sort", e.target.value || undefined)
                            }
                        >
                            <option value="">Sắp xếp</option>
                            <option value="rating">Đánh giá cao</option>
                            <option value="popular">Phổ biến</option>
                        </select>
                    </div>

                    {/* ===== MOBILE FILTER BAR ===== */}
                    <div className="d-flex d-md-none gap-2 mb-3">
                        <button
                            className="btn btn-outline-light w-50"
                            onClick={() => setShowMobileFilter(true)}
                        >
                            🔍 Lọc nâng cao
                        </button>

                        <select
                            className="form-select w-50"
                            value={rawFilters.sort}
                            onChange={(e) =>
                                updateParam("sort", e.target.value || undefined)
                            }
                        >
                            <option value="">Sắp xếp</option>
                            <option value="rating">Đánh giá cao</option>
                            <option value="popular">Phổ biến</option>
                        </select>
                    </div>


                    {/* ===== MOBILE LIST ===== */}
                    <div className="d-md-none d-flex flex-column gap-3">
                        {visibleBars.map((bar) => (
                            <BarCard
                                key={bar.id}
                                bar={bar}
                                layout="mobile"
                            />
                        ))}

                        {loadingMore &&
                            Array.from({ length: 2 }).map((_, i) => (
                                <BarCardSkeleton key={i} />
                            ))}
                    </div>
                    {/* ===== MOBILE FILTER MODAL ===== */}
                    {showMobileFilter && (
                        <div className="mobile-filter-overlay">
                            <div className="mobile-filter-sheet">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">Lọc nâng cao</h6>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setShowMobileFilter(false)}
                                    >
                                        ✕
                                    </button>
                                </div>

                                {/* CITY */}
                                <label className="fw-semibold mb-1">Tỉnh / Thành phố</label>
                                <select
                                    className="form-select mb-3"
                                    value={rawFilters.city}
                                    onChange={(e) =>
                                        updateParam("city", e.target.value || undefined)
                                    }
                                >
                                    <option value="">Tất cả</option>
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="HCM">HCM</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                </select>

                                {/* TYPE */}
                                <label className="fw-semibold mb-2">Loại hình</label>
                                {BAR_TYPES.map((item) => (
                                    <div className="form-check mb-2" key={item.value}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="mobile-type"
                                            checked={rawFilters.type === item.value}
                                            onChange={() =>
                                                updateParam("type", item.value)
                                            }
                                        />
                                        <label className="form-check-label">
                                            {item.label}
                                        </label>
                                    </div>
                                ))}

                                {/* PARTNER */}
                                <label className="fw-semibold mt-3 mb-2">
                                    Tình trạng hợp tác
                                </label>

                                <div className="form-check mb-2">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={rawFilters.partner === "partner"}
                                        onChange={(e) =>
                                            updateParam(
                                                "partner",
                                                e.target.checked ? "partner" : undefined
                                            )
                                        }
                                    />
                                    <label className="form-check-label">
                                        Đã hợp tác
                                    </label>
                                </div>

                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={rawFilters.partner === "non-partner"}
                                        onChange={(e) =>
                                            updateParam(
                                                "partner",
                                                e.target.checked ? "non-partner" : undefined
                                            )
                                        }
                                    />
                                    <label className="form-check-label">
                                        Chưa hợp tác
                                    </label>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-outline-secondary w-50"
                                        onClick={() => setSearchParams({})}
                                    >
                                        Xóa lọc
                                    </button>

                                    <button
                                        className="btn btn-primary w-50"
                                        onClick={() => setShowMobileFilter(false)}
                                    >
                                        Áp dụng
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ===== DESKTOP LIST ===== */}
                    <div className="d-none d-md-flex flex-column gap-4">
                        {visibleBars.map((bar) => (
                            <BarCard
                                key={bar.id}
                                bar={bar}
                                layout="horizontal"
                            />
                        ))}

                        {loadingMore &&
                            Array.from({ length: 2 }).map((_, i) => (
                                <BarCardSkeleton key={i} />
                            ))}
                    </div>

                    {hasMore && (
                        <div ref={loadMoreRef} style={{ height: 1 }} />
                    )}
                </main>
            </div>
        </div>
    )
}
