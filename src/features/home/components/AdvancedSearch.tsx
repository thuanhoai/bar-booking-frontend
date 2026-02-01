import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface SearchState {
    city: string
    district: string
    type: string
    priceRange: string
}

/* ===== LOCATION TYPES ===== */
type City = {
    code: number
    name: string
}

type District = {
    code: number
    name: string
}

/* ===== LOCATION API ===== */
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

export default function AdvancedSearch() {
    const navigate = useNavigate()

    const [search, setSearch] = useState<SearchState>({
        city: "",
        district: "",
        type: "",
        priceRange: "",
    })

    const [cities, setCities] = useState<City[]>([])
    const [districts, setDistricts] = useState<District[]>([])

    /* ===== LOAD CITIES ===== */
    useEffect(() => {
        locationApi.getCities().then(setCities)
    }, [])

    /* ===== LOAD DISTRICTS WHEN CITY CHANGE ===== */
    useEffect(() => {
        if (!search.city) {
            setDistricts([])
            setSearch((prev) => ({ ...prev, district: "" }))
            return
        }

        const city = cities.find((c) => c.name === search.city)
        if (!city) return

        locationApi
            .getDistrictsByCityCode(city.code)
            .then(setDistricts)
    }, [search.city, cities])

    const onChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target
        setSearch((prev) => ({ ...prev, [name]: value }))
    }

    const onSubmit = () => {
        const params = new URLSearchParams()

        Object.entries(search).forEach(([key, value]) => {
            if (value) params.append(key, value)
        })

        navigate(`/bars?${params.toString()}`)
    }

    return (
        <section className="container my-5">
            <div className="bg-dark rounded-4 p-4 shadow">
                <div className="row g-3 align-items-end">
                    {/* City */}
                    <div className="col-md-3">
                        <label className="form-label text-white">
                            Thành phố
                        </label>
                        <select
                            name="city"
                            className="form-select"
                            value={search.city}
                            onChange={onChange}
                        >
                            <option value="">Tất cả</option>
                            {cities.map((c) => (
                                <option key={c.code} value={c.name}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* District */}
                    <div className="col-md-3">
                        <label className="form-label text-white">
                            Quận / Huyện
                        </label>
                        <select
                            name="district"
                            className="form-select"
                            value={search.district}
                            onChange={onChange}
                            disabled={!districts.length}
                        >
                            <option value="">Tất cả</option>
                            {districts.map((d) => (
                                <option key={d.code} value={d.name}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Type */}
                    <div className="col-md-3">
                        <label className="form-label text-white">
                            Loại hình
                        </label>
                        <select
                            name="type"
                            className="form-select"
                            value={search.type}
                            onChange={onChange}
                        >
                            <option value="">Tất cả</option>
                            <option value="lounge">Lounge</option>
                            <option value="club">Club</option>
                            <option value="rooftop">Rooftop</option>
                        </select>
                    </div>

                    {/* Price */}
                    <div className="col-md-2">
                        <label className="form-label text-white">
                            Khoảng giá
                        </label>
                        <select
                            name="priceRange"
                            className="form-select"
                            value={search.priceRange}
                            onChange={onChange}
                        >
                            <option value="">Tất cả</option>
                            <option value="low">Dưới 500k</option>
                            <option value="mid">500k – 1tr</option>
                            <option value="high">Trên 1tr</option>
                        </select>
                    </div>

                    {/* Button */}
                    <div className="col-md-1 d-grid">
                        <button
                            className="btn btn-primary fw-semibold"
                            onClick={onSubmit}
                        >
                            Tìm
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
