import { useNavigate } from "react-router-dom"

export default function Topbar() {
    const navigate = useNavigate()

    const handleLogout = () => {
        const ok = window.confirm("Bạn có chắc muốn đăng xuất?")
        if (!ok) return

        localStorage.removeItem("admin_logged_in")
        navigate("/admin/login")
    }

    return (
        <div
            className="d-flex justify-content-between align-items-center px-4"
            style={{
                height: 60,
                background: "#111827",
                borderBottom: "1px solid #374151",
            }}
        >
            <h6 className="mb-0">Dashboard</h6>

            <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-danger"
            >
                🚪 Logout
            </button>
        </div>
    )
}
