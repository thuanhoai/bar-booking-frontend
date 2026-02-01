import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../features/home/HomePage"
import BarListPage from "../features/bar/BarListPage"
import BarDetailPage from "../features/bar/BarDetailPage"
import { BlogDetailPage, BlogListPage } from "../features/blog"

export const router = createBrowserRouter([
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
])
