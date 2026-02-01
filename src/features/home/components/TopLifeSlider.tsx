import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { barApi } from "../../bar/services/barApi"
import type { Bar } from "../../bar/types"
import { Loading } from "../../../components/Loading"

export default function TopLifeSlider() {
    const [bars, setBars] = useState<Bar[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        barApi.getBars().then((data) => {
            setBars(data.slice(0, 8)) // ví dụ top 8
            setLoading(false)
        })
    }, [])

    if (loading) return <Loading />

    return (
        <section className="container my-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">
                    Tổng hợp địa điểm 9Life đề xuất tại TP.HCM
                </h2>
            </div>

            <div className="d-flex gap-4 overflow-hidden">
                {bars.map((bar) => (
                    <div
                        key={bar.id}
                        style={{ minWidth: 300 }}
                        className="card border-0 shadow-sm"
                        role="button"
                        onClick={() => navigate(`/bars/${bar.id}`)}
                    >
                        <div style={{ height: 200 }}>
                            <img
                                src={bar.image}
                                alt={bar.name}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                            />
                        </div>

                        <div className="p-3">
                            <h6 className="fw-semibold mb-1">{bar.name}</h6>
                            <small className="text-muted">
                                {bar.district}, {bar.city}
                            </small>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
