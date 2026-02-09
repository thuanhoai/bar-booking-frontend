import { useEffect, useState } from "react"
import { adminBookingService } from "../services/adminBooking.service"
import { adminBarService } from "../services/adminBar.service"
import { adminBlogService } from "../services/adminBlog.service"

export default function Dashboard() {
    const [stats, setStats] = useState({
        bars: 0,
        blogs: 0,
        todayBookings: 0,
    })

    const [recentBookings, setRecentBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadDashboard()
    }, [])

    const loadDashboard = async () => {
        try {
            setLoading(true)

            const [barsRes, blogsRes, bookingsRes] = await Promise.all([
                adminBarService.getAll(),
                adminBlogService.getAll(),
                adminBookingService.getAll(),
            ])

            const today = new Date().toISOString().slice(0, 10)

            const todayBookings = bookingsRes.data.filter(
                (b: any) => b.booking_date === today
            )

            setStats({
                bars: barsRes.data.length,
                blogs: blogsRes.data.length,
                todayBookings: todayBookings.length,
            })

            setRecentBookings(bookingsRes.data.slice(0, 5))
        } catch (err) {
            console.error("❌ Dashboard error:", err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <p className="text-light">Đang tải dashboard...</p>
    }

    return (
        <>
            <h2 className="mb-1">Dashboard</h2>
            <p className="text-secondary mb-4">Tổng quan hệ thống</p>

            {/* ================= STATS ================= */}
            <div className="row g-3 mb-4">
                <StatCard title="Tổng Bar" value={stats.bars} />
                <StatCard title="Booking hôm nay" value={stats.todayBookings} />
                <StatCard title="Blog" value={stats.blogs} />
                <StatCard title="Doanh thu" value="—" />
            </div>

            {/* ================= RECENT BOOKINGS ================= */}
            <div className="card bg-dark text-light">
                <div className="card-body">
                    <h5 className="mb-3">📋 Booking mới</h5>

                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Khách</th>
                                <th>Bar</th>
                                <th>Ngày</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentBookings.map((b, i) => (
                                <tr key={b.id}>
                                    <td>{i + 1}</td>
                                    <td>{b.customer_name}</td>
                                    <td>{b.bar?.name}</td>
                                    <td>{b.booking_date}</td>
                                    <td>
                                        <StatusBadge status={b.status} />
                                    </td>
                                </tr>
                            ))}

                            {!recentBookings.length && (
                                <tr>
                                    <td colSpan={5} className="text-center text-muted">
                                        Chưa có booking
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

/* ================= COMPONENTS ================= */

function StatCard({ title, value }: { title: string; value: any }) {
    return (
        <div className="col-md-3">
            <div className="card bg-dark text-light">
                <div className="card-body">
                    <h6 className="text-secondary">{title}</h6>
                    <h3>{value}</h3>
                </div>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    if (status === "confirmed") {
        return <span className="badge bg-success">Xác nhận</span>
    }
    if (status === "cancelled") {
        return <span className="badge bg-danger">Hủy</span>
    }
    return <span className="badge bg-warning text-dark">Chờ</span>
}
