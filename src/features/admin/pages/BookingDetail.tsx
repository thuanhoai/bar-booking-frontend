import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { adminBookingService } from "../services/adminBooking.service"

export default function BookingDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [booking, setBooking] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        adminBookingService.getById(Number(id))
            .then(res => setBooking(res.data))
            .finally(() => setLoading(false))
    }, [id])

    if (loading) return <div className="text-light">Đang tải...</div>
    if (!booking) return <div className="text-danger">Không tìm thấy booking</div>

    return (
        <div className="card bg-dark text-light p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>📄 Chi tiết đặt bàn</h4>
                <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    ← Quay lại
                </button>
            </div>

            <ul className="list-group list-group-flush">
                <li className="list-group-item bg-dark text-light">
                    <strong>Khách:</strong> {booking.customer_name}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Điện thoại:</strong> {booking.customer_phone}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Quán:</strong> {booking.bar?.name}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Ngày:</strong>{" "}
                    {new Date(booking.booking_date).toLocaleDateString("vi-VN")}

                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Giờ:</strong> {booking.booking_time}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Số người:</strong> {booking.people_count}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Ghi chú:</strong> {booking.customer_note || "-"}
                </li>
                <li className="list-group-item bg-dark text-light">
                    <strong>Trạng thái:</strong>{" "}
                    <span className="badge bg-warning text-dark">
                        {booking.status}
                    </span>
                </li>
            </ul>
        </div>
    )
}
