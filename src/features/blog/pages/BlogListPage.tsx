import BlogCard from "../components/BlogCard"
import BlogHero from "../components/BlogHero"
import { BLOGS } from "../data/blogData"
import "../blog.css"
import BreadcrumbBar from "../components/BreadcrumbBar"

export default function BlogListPage() {
    return (
        <div className="container my-5">
            {/* ===== BREADCRUMB ===== */}
            <BreadcrumbBar
                items={[
                    { label: "Trang chủ", to: "/" },
                    { label: "Danh sách", to: "/bars" },

                ]}
            />


            <div className="row g-4">
                {BLOGS.map((post) => (
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
