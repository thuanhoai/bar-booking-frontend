import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import BreadcrumbBar from "../components/BreadcrumbBar"
import { blogApi } from "../data/blog.api"
import type { Blog } from "../types"
import "../blog.css"

export default function BlogDetailPage() {
    const { id } = useParams()
    const [post, setPost] = useState<Blog | null>(null)
    const [related, setRelated] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)

    /* ================= LOAD BLOG ================= */
    useEffect(() => {
        if (!id) return

        const loadData = async () => {
            try {
                setLoading(true)

                // 1️⃣ lấy bài hiện tại
                const blog = await blogApi.getBlogById(Number(id))
                setPost(blog)

                // 2️⃣ lấy các bài liên quan (logic cũ)
                const allBlogs = await blogApi.getBlogs()
                const relatedBlogs = allBlogs
                    .filter(b => b.id !== blog.id)
                    .slice(0, 5)

                setRelated(relatedBlogs)
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [id])

    /* ================= STATES ================= */
    if (loading) {
        return (
            <div className="container my-5 text-white">
                Đang tải bài viết...
            </div>
        )
    }

    if (!post) {
        return (
            <div className="container my-5 text-white">
                Không tìm thấy bài viết
            </div>
        )
    }

    return (
        <div className="container my-4 blog-detail-page">

            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Blog", to: "/blog" },
                    { label: post.title }
                ]}
            />

            <div className="row g-4">

                {/* ================= MAIN ================= */}
                <div className="col-12 col-lg-8">
                    <article className="blog-detail-card">

                        {/* TITLE */}
                        <h1 className="blog-title">
                            {post.title}
                        </h1>

                        {/* META */}
                        <div className="blog-meta-row">
                            <span>📅 {post.date}</span>
                            <span>👤 Admin 9Life</span>
                            <span>⏱ {post.readTime}</span>
                        </div>

                        {/* EXCERPT */}
                        {post.excerpt && (
                            <p className="blog-excerpt">
                                {post.excerpt}
                            </p>
                        )}

                        {/* TOC */}
                        {post.sections && post.sections.length > 0 && (
                            <div className="blog-toc">
                                <div className="toc-title">
                                    NỘI DUNG CHÍNH
                                </div>

                                <ul>
                                    {post.sections.map((sec, index) => (
                                        <li key={index}>
                                            <a
                                                href={`#section-${index}`}
                                                className="toc-link"
                                            >
                                                {sec.heading}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CONTENT */}
                        <div className="blog-content">
                            {post.sections?.map((sec, index) => (
                                <section
                                    key={index}
                                    id={`section-${index}`}
                                    className="blog-section"
                                >
                                    <h2 className="blog-section-title">
                                        {sec.heading}
                                    </h2>

                                    <div className="blog-section-content">
                                        {sec.content}
                                    </div>

                                    {sec.image && (
                                        <div className="blog-section-image-wrap">
                                            <img
                                                src={sec.image}
                                                alt={sec.heading}
                                                className="blog-section-image"
                                            />
                                        </div>
                                    )}
                                </section>
                            ))}
                        </div>

                    </article>
                </div>

                {/* ================= SIDEBAR ================= */}
                <div className="col-12 col-lg-4">
                    <div className="blog-sidebar-sticky">
                        <aside className="blog-sidebar">

                            <h5 className="sidebar-title">
                                CÁC BÀI VIẾT LIÊN QUAN
                            </h5>

                            <ul className="related-list">
                                {related.map(r => (
                                    <li key={r.id}>
                                        <Link to={`/blog/${r.id}`}>
                                            {r.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                        </aside>
                    </div>
                </div>

            </div>
        </div>
    )
}
