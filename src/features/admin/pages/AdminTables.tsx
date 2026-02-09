import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { adminTableService } from "../services/adminTable.service"

export default function AdminTables() {
    const { barId } = useParams<{ barId: string }>()
    const navigate = useNavigate()
    const [tables, setTables] = useState<any[]>([])

    useEffect(() => {
        if (!barId) return

        adminTableService
            .getByBar(Number(barId))
            .then(res => setTables(res.data))
    }, [barId])

    return (
        <div className="card bg-dark text-light p-3">
            <h5>Danh sách bàn</h5>

            <button
                className="btn btn-primary mb-3"
                onClick={() => navigate(`/admin/bars/${barId}/tables/new`)}
            >
                ➕ Thêm bàn
            </button>

            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Số người</th>
                        <th>VIP</th>
                        <th>Trạng thái</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {tables.map(t => (
                        <tr key={t.id}>
                            <td>{t.name}</td>
                            <td>{t.min_people} – {t.max_people}</td>
                            <td>{t.is_vip ? "⭐ VIP" : "-"}</td>
                            <td>{t.status}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-warning me-2"
                                    onClick={() =>
                                        navigate(`/admin/tables/${t.id}/edit`)
                                    }
                                >
                                    Sửa
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => {
                                        adminTableService
                                            .remove(t.id)
                                            .then(() =>
                                                setTables(prev =>
                                                    prev.filter(x => x.id !== t.id)
                                                )
                                            )
                                    }}
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
