import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminBarService } from "../services/adminBar.service"

export default function Bars() {
    const [bars, setBars] = useState<any[]>([])
    const navigate = useNavigate()

    const loadBars = async () => {
        const res = await adminBarService.getAll()
        setBars(res.data)
    }

    useEffect(() => {
        loadBars()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm("Bạn có chắc muốn xóa quán bar này?")) return
        await adminBarService.remove(id)
        loadBars()
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>Quản lý quán bar</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/admin/bars/new")}
                >
                    ➕ Thêm bar
                </button>
            </div>

            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Loại</th>
                        <th>Giá</th>
                        <th>Rating</th>
                        <th>Hợp tác</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {bars.map(bar => (
                        <tr key={bar.id}>
                            <td>{bar.name}</td>
                            <td>{bar.type}</td>
                            <td>{bar.priceRange}</td>
                            <td>{bar.rating ?? "-"}</td>
                            <td>
                                {bar.partnerStatus === "partner"
                                    ? "🤝 Hợp tác"
                                    : "❌ Chưa hợp tác"}
                            </td>
                            <td className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() =>
                                        navigate(`/admin/bars/${bar.id}/edit`)
                                    }
                                >
                                    Sửa
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(bar.id)}
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
