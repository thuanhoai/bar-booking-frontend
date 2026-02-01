import { Link, useParams } from "react-router-dom"
import { BLOGS } from "../data/blogData"
import "../blog.css"
import BreadcrumbBar from "../components/BreadcrumbBar"

export default function BlogDetailPage() {
    const { id } = useParams()
    const post = BLOGS.find(b => b.id === Number(id))

    if (!post) {
        return (
            <div className="container my-5 text-white">
                Không tìm thấy bài viết
            </div>
        )
    }

    const related = BLOGS
        .filter(b => b.id !== post.id)
        .slice(0, 5)

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

                        {/* HERO IMAGE */}
                        <img
                            src={post.image}
                            alt={post.title}
                            className="blog-hero"
                        />

                        {/* TOC BOX */}
                        <div className="blog-toc">
                            <div className="toc-title">
                                NỘI DUNG CHÍNH
                            </div>

                            <ul>
                                <li>Giới thiệu tổng quan</li>
                                <li>Địa điểm nổi bật</li>
                                <li>Kinh nghiệm đi thực tế</li>
                                <li>Chi phí & lưu ý</li>
                                <li>Kết luận</li>
                            </ul>
                        </div>

                        {/* CONTENT */}
                        <div className="blog-content">
                            {post.content}
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
