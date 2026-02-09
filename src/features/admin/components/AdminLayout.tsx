import { Navigate, Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import Topbar from "./Topbar"
import { useEffect } from "react"

export default function AdminLayout() {
    const navigate = useNavigate()
    const isLoggedIn = localStorage.getItem("admin_logged_in")

    // ✅ Nếu chưa login → đá về trang login
    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/admin/login", { replace: true })
        }
    }, [isLoggedIn, navigate])

    // tránh render nháy layout khi chưa login
    if (!isLoggedIn) return null

    return (
        <div
            className="d-flex"
            style={{ minHeight: "100vh", background: "#2b2b2b" }}
        >
            <Sidebar />

            <div className="flex-grow-1">
                <Topbar />

                <main className="p-4 text-light">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
