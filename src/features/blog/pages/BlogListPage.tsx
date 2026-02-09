import { useEffect, useState } from "react"
import BlogCard from "../components/BlogCard"
import BreadcrumbBar from "../components/BreadcrumbBar"
import { blogApi } from "../data/blog.api"
import type { Blog } from "../types"
import "../blog.css"

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    /* ================= LOAD BLOGS ================= */
    useEffect(() => {
        const loadBlogs = async () => {
            try {
                setLoading(true)
                const data = await blogApi.getBlogs()
                setBlogs(data)
            } finally {
                setLoading(false)
            }
        }

        loadBlogs()
    }, [])

    if (loading) {
        return (
            <div className="container my-5 text-white">
                Đang tải bài viết...
            </div>
        )
    }

    return (
        <div className="container my-5">
            {/* ===== BREADCRUMB ===== */}
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Blog", to: "/blog" },
                ]}
            />

            <div className="row g-4">
                {blogs.map(post => (
                    <div
                        key={post.id}
                        className="col-12 col-md-6 col-lg-4"
                    >
                        <BlogCard post={post} />
                    </div>
                ))}
            </div>
        </div>
    )
}
