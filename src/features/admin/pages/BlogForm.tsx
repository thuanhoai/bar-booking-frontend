import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { adminBlogService } from "../services/adminBlog.service"

type SectionForm = {
    heading: string
    content: string
    image: string
}

export default function BlogForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState<{
        title: string
        slug: string
        excerpt: string
        image: string
        category: string
        readTime: number
        sections: SectionForm[]
    }>({
        title: "",
        slug: "",
        excerpt: "",
        image: "",
        category: "",
        readTime: 5,
        sections: [{ heading: "", content: "", image: "" }],
    })

    /* ================= LOAD BLOG WHEN EDIT ================= */
    useEffect(() => {
        if (!isEdit) return

        adminBlogService.getById(Number(id)).then(res => {
            const blog = res.data

            setForm({
                title: blog.title || "",
                slug: blog.slug || "",
                excerpt: blog.excerpt || "",
                image: blog.image || "",
                category: blog.category || "",
                readTime: Number(blog.readTime) || 5,
                sections:
                    blog.sections && blog.sections.length > 0
                        ? blog.sections.map((s: any) => ({
                            heading: s.heading || "",
                            content: s.content || "",
                            image: s.image || "",
                        }))
                        : [{ heading: "", content: "", image: "" }],
            })
        })
    }, [id, isEdit])

    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        if (!form.title.trim() || !form.slug.trim()) {
            alert("❌ Vui lòng nhập tiêu đề và slug")
            return
        }

        setLoading(true)
        try {
            if (isEdit) {
                await adminBlogService.update(Number(id), form)
            } else {
                await adminBlogService.create(form)
            }

            alert("✅ Lưu blog thành công")
            navigate("/admin/blogs")
        } catch (e) {
            console.error(e)
            alert("❌ Lỗi khi lưu blog")
        } finally {
            setLoading(false)
        }
    }

    /* ================= UI ================= */
    return (
        <div className="card bg-dark text-light p-4">
            <h4 className="mb-3">
                {isEdit ? "✏️ Sửa blog" : "➕ Thêm blog"}
            </h4>

            <input
                className="form-control mb-2"
                placeholder="Tiêu đề"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Slug"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
            />

            <textarea
                className="form-control mb-2"
                placeholder="Excerpt"
                rows={3}
                value={form.excerpt}
                onChange={e => setForm({ ...form, excerpt: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Ảnh cover (URL)"
                value={form.image}
                onChange={e => setForm({ ...form, image: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Danh mục"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
            />

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Thời gian đọc (phút)"
                min={1}
                value={form.readTime}
                onChange={e =>
                    setForm({ ...form, readTime: Number(e.target.value) })
                }
            />

            <h6 className="mb-2">Nội dung</h6>

            {form.sections.map((sec, i) => (
                <div key={i} className="border rounded p-3 mb-3">
                    <input
                        className="form-control mb-2"
                        placeholder="Heading"
                        value={sec.heading}
                        onChange={e => {
                            const sections = [...form.sections]
                            sections[i].heading = e.target.value
                            setForm({ ...form, sections })
                        }}
                    />

                    <textarea
                        className="form-control mb-2"
                        rows={4}
                        placeholder="Content"
                        value={sec.content}
                        onChange={e => {
                            const sections = [...form.sections]
                            sections[i].content = e.target.value
                            setForm({ ...form, sections })
                        }}
                    />

                    <input
                        className="form-control"
                        placeholder="Image section (URL)"
                        value={sec.image}
                        onChange={e => {
                            const sections = [...form.sections]
                            sections[i].image = e.target.value
                            setForm({ ...form, sections })
                        }}
                    />

                    {form.sections.length > 1 && (
                        <button
                            className="btn btn-sm btn-danger mt-2"
                            onClick={() => {
                                const sections = form.sections.filter(
                                    (_, idx) => idx !== i
                                )
                                setForm({ ...form, sections })
                            }}
                        >
                            🗑 Xóa section
                        </button>
                    )}
                </div>
            ))}

            <button
                className="btn btn-sm btn-secondary mb-3"
                onClick={() =>
                    setForm({
                        ...form,
                        sections: [
                            ...form.sections,
                            { heading: "", content: "", image: "" },
                        ],
                    })
                }
            >
                ➕ Thêm section
            </button>

            <button
                className="btn btn-primary"
                disabled={loading}
                onClick={handleSubmit}
            >
                💾 {loading ? "Đang lưu..." : "Lưu blog"}
            </button>
        </div>
    )
}
