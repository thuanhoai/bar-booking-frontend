import { Routes, Route, Navigate } from "react-router-dom"
import AdminLayout from "./components/AdminLayout"
import Dashboard from "./pages/Dashboard"
import Bars from "./pages/Bars"
import BarForm from "./pages/BarForm"
import AdminBookings from "./pages/AdminBookings"
import Users from "./pages/Users"
import Login from "./pages/Login"
import BookingDetail from "./pages/BookingDetail"
import Blogs from "./pages/Blogs"
import BlogForm from "./pages/BlogForm"

/* =====================
   AUTH CHECK
===================== */
const isAdminLoggedIn = () => {
    return localStorage.getItem("admin_logged_in") === "true"
}

export default function AdminRoutes() {
    return (
        <Routes>
            {/* ================= LOGIN ================= */}
            <Route path="/admin/login" element={<Login />} />

            {/* ================= ADMIN ================= */}
            <Route
                path="/admin"
                element={
                    isAdminLoggedIn()
                        ? <AdminLayout />
                        : <Navigate to="/admin/login" replace />
                }
            >
                {/* DASHBOARD */}
                <Route index element={<Dashboard />} />

                {/* BARS */}
                <Route path="bars" element={<Bars />} />
                <Route path="bars/new" element={<BarForm />} />
                <Route path="bars/:id/edit" element={<BarForm />} />

                {/* BOOKINGS */}
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="bookings/:id" element={<BookingDetail />} />

                {/* BLOGS */}
                <Route path="blogs" element={<Blogs />} />
                <Route path="blogs/new" element={<BlogForm />} />
                <Route path="blogs/:id/edit" element={<BlogForm />} />

                {/* USERS */}
                <Route path="users" element={<Users />} />
            </Route>

            {/* ================= FALLBACK ================= */}
            <Route
                path="*"
                element={
                    <Navigate
                        to={isAdminLoggedIn() ? "/admin" : "/admin/login"}
                        replace
                    />
                }
            />
        </Routes>
    )
}
