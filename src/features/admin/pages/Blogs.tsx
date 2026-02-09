import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { adminBlogService } from "../services/adminBlog.service"

export default function Blogs() {
    const [blogs, setBlogs] = useState<any[]>([])
    const navigate = useNavigate()

    const loadBlogs = async () => {
        const res = await adminBlogService.getAll()
        setBlogs(res.data)
    }

    useEffect(() => {
        loadBlogs()
    }, [])

    if (!blogs.length) {
        return <p className="text-muted">Chưa có blog nào</p>
    }

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>Quản lý Blog</h2>

                <button
                    className="btn btn-success"
                    onClick={() => navigate("/admin/blogs/new")}
                >
                    ➕ Thêm blog
                </button>
            </div>

            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>Tiêu đề</th>
                        <th>Danh mục</th>
                        <th>Ngày đăng</th>
                        <th>Thời gian đọc</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {blogs.map(blog => (
                        <tr key={blog.id}>
                            <td>{blog.title}</td>
                            <td>{blog.category}</td>
                            <td>{blog.date}</td>
                            <td>{blog.readTime} phút</td>
                            <td className="d-flex gap-2">
                                <button
                                    className="btn btn-sm btn-warning"
                                    onClick={() =>
                                        navigate(`/admin/blogs/${blog.id}/edit`)
                                    }
                                >
                                    Sửa
                                </button>

                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() =>
                                        adminBlogService.remove(blog.id).then(loadBlogs)
                                    }
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
