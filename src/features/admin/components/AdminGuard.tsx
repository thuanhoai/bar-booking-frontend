import { Navigate } from "react-router-dom"

export default function AdminGuard({ children }: any) {
    const isLoggedIn = localStorage.getItem("admin_logged_in")

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />
    }

    return children
}
