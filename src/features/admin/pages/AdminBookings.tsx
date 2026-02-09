import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminBookingService } from "../services/adminBooking.service"

export default function AdminBookings() {
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const loadData = useCallback(() => {
        setLoading(true)
        adminBookingService
            .getAll()
            .then(res => setBookings(res.data))
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        loadData()
    }, [loadData])

    const updateStatus = (id: number, status: string) => {
        adminBookingService.updateStatus(id, status).then(loadData)
    }

    const remove = (id: number) => {
        if (!window.confirm("Xóa đơn đặt bàn này?")) return
        adminBookingService.delete(id).then(loadData)
    }

    if (loading) {
        return <div className="text-light">Đang tải...</div>
    }

    return (
        <div className="card bg-dark text-light p-3">
            <h4 className="mb-3">📋 Danh sách đặt bàn</h4>

            {bookings.length === 0 ? (
                <div className="text-muted">Chưa có đơn đặt bàn</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-dark table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Khách</th>
                                <th>Điện thoại</th>
                                <th>Quán</th>
                                <th>Ngày</th>
                                <th>Giờ</th>
                                <th>Số người</th>
                                <th>Trạng thái</th>
                                <th className="text-end">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b.id}>
                                    <td>{b.customer_name}</td>
                                    <td>{b.customer_phone}</td>
                                    <td>{b.bar?.name || "-"}</td>
                                    <td>
                                        {new Date(b.booking_date).toLocaleDateString("vi-VN")}
                                    </td>
                                    <td>{b.booking_time}</td>
                                    <td>{b.people_count}</td>
                                    <td>
                                        <span
                                            className={`badge ${b.status === "confirmed"
                                                ? "bg-success"
                                                : b.status === "cancelled"
                                                    ? "bg-danger"
                                                    : "bg-warning text-dark"
                                                }`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>
                                    <td className="text-end">
                                        {/* CHI TIẾT */}
                                        <button
                                            className="btn btn-sm btn-info me-2"
                                            onClick={() =>
                                                navigate(`/admin/bookings/${b.id}`)
                                            }
                                        >
                                            👁 Chi tiết
                                        </button>

                                        {/* DUYỆT / HỦY */}
                                        {b.status === "pending" && (
                                            <>
                                                <button
                                                    className="btn btn-sm btn-success me-2"
                                                    onClick={() =>
                                                        updateStatus(b.id, "confirmed")
                                                    }
                                                >
                                                    ✔ Duyệt
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-secondary me-2"
                                                    onClick={() =>
                                                        updateStatus(b.id, "cancelled")
                                                    }
                                                >
                                                    ✖ Hủy
                                                </button>
                                            </>
                                        )}

                                        {/* XÓA */}
                                        <button
                                            className="btn btn-sm btn-danger"
                                            onClick={() => remove(b.id)}
                                        >
                                            🗑
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
