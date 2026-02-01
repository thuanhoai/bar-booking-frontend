import { useEffect, useMemo, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"

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

/* ================= LOCATION API (ADD ONLY) ================= */

type City = { code: number; name: string }
type District = { code: number; name: string }

const locationApi = {
    getCities: async (): Promise<City[]> => {
        const res = await fetch("https://provinces.open-api.vn/api/p/")
        return res.json()
    },
    getDistrictsByCityCode: async (code: number): Promise<District[]> => {
        const res = await fetch(
            `https://provinces.open-api.vn/api/p/${code}?depth=2`
        )
        const data = await res.json()
        return data.districts || []
    },
}

export default function BarListPage() {
    const [bars, setBars] = useState<Bar[]>([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
    const [showMobileFilter, setShowMobileFilter] = useState(false)

    // 🔥 ADD – không ảnh hưởng logic cũ
    const [cities, setCities] = useState<City[]>([])
    const [districts, setDistricts] = useState<District[]>([])

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

    // fetch cities
    useEffect(() => {
        locationApi.getCities().then(setCities)
    }, [])

    // fetch districts by city
    useEffect(() => {
        if (!rawFilters.city) {
            setDistricts([])
            updateParam("district", undefined)
            return
        }

        const city = cities.find((c) => c.name === rawFilters.city)
        if (!city) return

        locationApi.getDistrictsByCityCode(city.code).then(setDistricts)
    }, [rawFilters.city, cities])

    useEffect(() => {
        setVisibleCount(PAGE_SIZE)
    }, [filters])

    /* ================= FILTER + SORT ================= */
    const normalizeText = (str: string) =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim()

    const filteredBars = useMemo(() => {
        let list = [...bars]

        if (filters.keyword) {
            const q = normalizeText(filters.keyword)

            list = list.filter((bar) =>
                normalizeText(bar.name).includes(q) ||
                normalizeText(bar.address).includes(q) ||
                normalizeText(bar.city).includes(q) ||
                normalizeText(bar.district).includes(q)
            )
        }


        list = list.filter((bar) => {
            if (filters.city) {
                const normalizeCity = (v: string) =>
                    v
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace("thanh pho", "")
                        .replace("tp.", "")
                        .replace("tp", "")
                        .replace(/\s+/g, "")
                        .trim()

                const barCity = normalizeCity(bar.city)
                const filterCity = normalizeCity(filters.city)

                if (!filterCity.includes(barCity) && !barCity.includes(filterCity)) {
                    return false
                }
            }


            if (filters.district) {
                const normalizeDistrict = (v: string) =>
                    v
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace("quan", "")
                        .replace("huyen", "")
                        .replace("thi xa", "")
                        .replace(/\s+/g, "")
                        .trim()

                const barDistrict = normalizeDistrict(bar.district)
                const filterDistrict = normalizeDistrict(filters.district)

                if (
                    !filterDistrict.includes(barDistrict) &&
                    !barDistrict.includes(filterDistrict)
                ) {
                    return false
                }
            }

            if (filters.type && bar.type !== filters.type) return false

            if (filters.partner) {
                if (bar.partnerStatus !== filters.partner) return false
            }

            return true
        })


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

    /* ================= RENDER (GIỮ NGUYÊN RESPONSIVE) ================= */

    return (
        <div className="container my-4 barlist-layout">
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Danh sách", to: "/bars" },
                ]}
            />

            {/* ===== MOBILE FILTER BAR ===== */}
            <div className="d-flex d-md-none gap-2 mb-3">
                <button
                    className="btn btn-outline-light w-50"
                    onClick={() => setShowMobileFilter(true)}
                >
                    🔍 <span>Lọc nâng cao</span>
                </button>

                <select
                    className="form-select w-50"
                    value={rawFilters.sort}
                    onChange={(e) =>
                        updateParam("sort", e.target.value || undefined)
                    }
                >
                    <option value="">↕️ Sắp xếp</option>
                    <option value="rating">⭐ Đánh giá cao</option>
                    <option value="popular">🔥 Phổ biến</option>
                </select>
            </div>

            {showMobileFilter && (
                <div className="mobile-filter-overlay">
                    <div className="mobile-filter-sheet">
                        {/* HEADER */}
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
                            {cities.map((c) => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        {/* DISTRICT */}
                        <label className="fw-semibold mb-1">Quận / Huyện</label>
                        <select
                            className="form-select mb-3"
                            disabled={!districts.length}
                            value={rawFilters.district}
                            onChange={(e) =>
                                updateParam("district", e.target.value || undefined)
                            }
                        >
                            <option value="">Tất cả</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        {/* TYPE */}
                        <label className="fw-semibold mb-2">Loại hình</label>
                        <div className="row">
                            {BAR_TYPES.map((item) => (
                                <div key={item.value} className="col-6 mb-2">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="mobile-type"
                                            checked={rawFilters.type === item.value}
                                            onChange={() => updateParam("type", item.value)}
                                        />
                                        <label className="form-check-label">
                                            {item.label}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>

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
                            <label className="form-check-label">Đã hợp tác</label>
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
                            <label className="form-check-label">Chưa hợp tác</label>
                        </div>

                        {/* ACTION */}
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

            <div className="row g-4">
                {/* ================= SIDEBAR DESKTOP ================= */}
                <aside className="col-md-3 d-none d-md-block">
                    <div className="filter-box sticky-top p-3 rounded">
                        <h6 className="fw-bold mb-2">Tỉnh / Thành phố</h6>
                        <select
                            className="form-select mb-3"
                            value={rawFilters.city}
                            onChange={(e) =>
                                updateParam("city", e.target.value || undefined)
                            }
                        >
                            <option value="">Tất cả</option>
                            {cities.map((c) => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                        <h6 className="fw-bold mb-2">Quận / Huyện</h6>
                        <select
                            className="form-select mb-3"
                            value={rawFilters.district}
                            disabled={!districts.length}
                            onChange={(e) =>
                                updateParam(
                                    "district",
                                    e.target.value || undefined
                                )
                            }
                        >
                            <option value="">Tất cả</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>

                        <h6 className="fw-bold mb-2">Loại hình</h6>
                        {BAR_TYPES.map((item) => (
                            <div key={item.value} className="form-check mb-2">
                                <input
                                    className="form-check-input"
                                    type="radio"
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
                            rawFilters.district ||
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
                    {/* MOBILE LIST */}
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
                    {/* ===== DESKTOP HEADER ===== */}
                    <div className="d-none d-md-flex justify-content-between align-items-center mb-3">
                        <span className="fw-semibold">
                            Có {filteredBars.length} địa điểm phù hợp
                        </span>

                        <select
                            className="form-select w-auto"
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

                    {/* DESKTOP LIST */}
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
