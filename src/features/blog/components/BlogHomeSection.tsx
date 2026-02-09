import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { blogApi } from "../data/blog.api"
import type { Blog } from "../types"
import "../blog.css"

export default function BlogHomeSection() {
    const navigate = useNavigate()
    const location = useLocation() // ✅ detect quay lại trang
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    /* ================= LOAD BLOGS ================= */
    useEffect(() => {
        let mounted = true

        blogApi.getBlogs()
            .then((data) => {
                if (!mounted) return

                // ✅ giữ logic cũ: 6 bài mới nhất
                setBlogs(data.slice(0, 6))
            })
            .catch((err) => {
                console.error("Load blogs error:", err)
            })
            .finally(() => {
                if (mounted) setLoading(false)
            })

        return () => {
            mounted = false
        }
    }, [location.key]) // ✅ QUAN TRỌNG

    if (loading) {
        return (
            <section className="container my-5 text-white">
                Đang tải blog...
            </section>
        )
    }

    return (
        <section className="container my-5">
            <div className="mb-4">
                <h2 className="fw-bold text-white">
                    BLOG 9LIFE
                </h2>
            </div>

            <div className="row g-4">
                {blogs.map((blog) => (
                    <div key={blog.id} className="col-12 col-lg-6">
                        <Link
                            to={`/blog/${blog.id}`}
                            className="text-decoration-none"
                        >
                            <div className="blog-home-item d-flex gap-3">

                                {/* IMAGE */}
                                <div className="blog-home-thumb">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                    />
                                </div>

                                {/* CONTENT */}
                                <div className="flex-grow-1">
                                    <h6 className="blog-home-title">
                                        {blog.title}
                                    </h6>

                                    <div className="blog-home-meta">
                                        📅 {blog.date}
                                        <span className="mx-2">•</span>
                                        ⏱ {blog.readTime ?? 5} phút
                                        <span className="mx-2">•</span>
                                        🏷 {blog.category}
                                    </div>

                                    <div className="blog-home-excerpt">
                                        {blog.excerpt}
                                    </div>
                                </div>

                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="text-center mt-4">
                <button
                    onClick={() => navigate("/blog")}
                    className="btn btn-lg px-4 fw-bold"
                    style={{
                        borderRadius: 999,
                        background:
                            "linear-gradient(90deg,#a855f7,#ec4899)",
                        border: "none",
                        color: "#fff",
                    }}
                >
                    XEM TẤT CẢ BÀI VIẾT
                </button>
            </div>
        </section>
    )
}
