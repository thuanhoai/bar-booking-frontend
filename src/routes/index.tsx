import { createBrowserRouter } from "react-router-dom"

/* ========== PUBLIC ========== */
import MainLayout from "../layouts/MainLayout"
import HomePage from "../features/home/HomePage"
import BarListPage from "../features/bar/BarListPage"
import BarDetailPage from "../features/bar/BarDetailPage"
import { BlogDetailPage, BlogListPage } from "../features/blog"

/* ========== ADMIN ========== */
import AdminLayout from "../features/admin/components/AdminLayout"
import AdminLogin from "../features/admin/pages/Login"
import Dashboard from "../features/admin/pages/Dashboard"
import Bars from "../features/admin/pages/Bars"
import BarForm from "../features/admin/pages/BarForm"
import BookingDetail from "../features/admin/pages/BookingDetail"
import Bookings from "../features/admin/pages/AdminBookings"
import Users from "../features/admin/pages/Users"

/* ===== ADMIN BLOG (NEW) ===== */
import Blogs from "../features/admin/pages/Blogs"
import BlogForm from "../features/admin/pages/BlogForm"

export const router = createBrowserRouter([
    /* ================= PUBLIC ================= */
    {
        element: <MainLayout />,
        children: [
            { path: "/", element: <HomePage /> },
            { path: "/bars", element: <BarListPage /> },
            { path: "/bars/:id", element: <BarDetailPage /> },
            { path: "/blog", element: <BlogListPage /> },
            { path: "/blog/:id", element: <BlogDetailPage /> },
        ],
    },

    /* ================= ADMIN LOGIN ================= */
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },

    /* ================= ADMIN ================= */
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <Dashboard /> },

            /* ===== BARS ===== */
            { path: "bars", element: <Bars /> },
            { path: "bars/new", element: <BarForm /> },
            { path: "bars/:id/edit", element: <BarForm /> },

            /* ===== BLOGS (NEW) ===== */
            { path: "blogs", element: <Blogs /> },
            { path: "blogs/new", element: <BlogForm /> },
            { path: "blogs/:id/edit", element: <BlogForm /> },

            /* ===== BOOKINGS ===== */
            { path: "bookings", element: <Bookings /> },
            { path: "bookings/:id", element: <BookingDetail /> },

            /* ===== USERS ===== */
            { path: "users", element: <Users /> },
        ],
    },
])
