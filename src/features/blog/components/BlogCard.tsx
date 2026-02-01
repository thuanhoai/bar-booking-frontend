import { useNavigate } from "react-router-dom"

export default function BlogCard({ post }: any) {
    const navigate = useNavigate()

    return (
        <div
            className="blog-card"
            onClick={() => navigate(`/blog/${post.id}`)}
        >
            <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <span className="blog-category">
                    {post.category}
                </span>
            </div>

            <div className="blog-body">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>

                <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                </div>
            </div>
        </div>
    )
}
