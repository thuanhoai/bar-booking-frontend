import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { adminBarService } from "../services/adminBar.service"

const DAYS = [
    { label: "Chủ nhật", value: 0 },
    { label: "Thứ 2", value: 1 },
    { label: "Thứ 3", value: 2 },
    { label: "Thứ 4", value: 3 },
    { label: "Thứ 5", value: 4 },
    { label: "Thứ 6", value: 5 },
    { label: "Thứ 7", value: 6 },
]

export default function BarForm() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState<any>({
        name: "",
        slug: "",
        description: "",
        address: "",

        province_code: "",
        district_code: "",

        lat: "",
        lng: "",

        type: "rooftop",
        price_range: "high",

        partner_status: "partner",
        rating_avg: 0,
        booking_count: 0,

        images: [""],

        openingHours: DAYS.map(d => ({
            day: d.value,
            open: "18:00",
            close: "02:00",
        })),
        sections: [
            {
                title: "",
                content: "",
            },
        ],


    })

    /* ================= LOAD BAR WHEN EDIT ================= */
    useEffect(() => {
        if (!isEdit) return

        adminBarService.getById(Number(id)).then(res => {
            const bar = res.data

            console.log("🟢 BAR FROM API:", bar)

            setForm({
                name: bar.name ?? "",
                slug: bar.slug ?? "",
                description: bar.description ?? "",
                address: bar.address ?? "",

                province_code: bar.province_code ?? "",
                district_code: bar.district_code ?? "",

                lat: bar.lat ?? "",
                lng: bar.lng ?? "",

                type: bar.type ?? "rooftop",
                price_range: bar.priceRange ?? "high",

                partner_status: bar.partnerStatus ?? "partner",
                rating_avg: bar.rating ?? 0,
                booking_count: bar.bookingCount ?? 0,

                images: Array.isArray(bar.images) && bar.images.length
                    ? bar.images
                    : [""],

                openingHours: Array.isArray(bar.openingHours) && bar.openingHours.length
                    ? bar.openingHours.map((o: any) => ({
                        day: o.day,
                        open: o.open,
                        close: o.close,
                    }))
                    : DAYS.map(d => ({
                        day: d.value,
                        open: "18:00",
                        close: "02:00",
                    })),
                sections: Array.isArray(bar.sections) && bar.sections.length
                    ? bar.sections.map((s: any) => ({
                        id: s.id,
                        title: s.title,
                        content: s.content,
                    }))
                    : [
                        {
                            title: "",
                            content: "",
                        },
                    ],

            })
        })
    }, [id, isEdit])


    /* ================= SUBMIT ================= */
    const handleSubmit = async () => {
        try {
            if (!form.name || !form.slug) {
                alert("❌ Vui lòng nhập tên bar và slug")
                return
            }

            if (!form.province_code || !form.district_code) {
                alert("❌ Province code và District code không được để trống")
                return
            }

            const payload = {
                name: form.name.trim(),
                slug: form.slug.trim(),
                description: form.description,
                address: form.address,

                province_code: Number(form.province_code),
                district_code: Number(form.district_code),

                lat: Number(form.lat),
                lng: Number(form.lng),

                type: form.type,
                price_range: form.price_range,

                partner_status: form.partner_status,
                rating_avg: Number(form.rating_avg) || 0,
                booking_count: Number(form.booking_count) || 0,

                images: form.images.filter((i: string) => i.trim() !== ""),
                openingHours: form.openingHours,
                sections: form.sections
                    .filter((s: any) => s.title.trim() !== "")
                    .map((s: any, index: number) => ({
                        id: s.id,
                        title: s.title,
                        content: s.content,
                        sort_order: index,
                        status: "active",
                    })),

            }

            console.log("📦 BAR PAYLOAD:", payload)

            setLoading(true)

            if (isEdit) {
                await adminBarService.update(Number(id), payload)
                alert("✅ Cập nhật bar thành công")
            } else {
                await adminBarService.create(payload)
                alert("✅ Thêm bar thành công")
            }

            navigate("/admin/bars")
        } catch (err) {
            console.error("❌ BAR SUBMIT ERROR:", err)
            alert("❌ Không thể lưu bar, kiểm tra console")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card bg-dark text-light p-3">
            <h5 className="mb-3">
                {isEdit ? "✏️ Sửa quán bar" : "➕ Thêm quán bar"}
            </h5>

            <input
                className="form-control mb-2"
                placeholder="Tên bar"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Slug (không dấu, không space)"
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
            />

            <textarea
                className="form-control mb-2"
                placeholder="Mô tả"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <input
                className="form-control mb-2"
                placeholder="Địa chỉ"
                value={form.address}
                onChange={e => setForm({ ...form, address: e.target.value })}
            />

            <div className="row">
                <div className="col">
                    <input
                        className="form-control mb-2"
                        placeholder="Province code (VD: 79)"
                        value={form.province_code}
                        onChange={e => setForm({ ...form, province_code: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        className="form-control mb-2"
                        placeholder="District code (VD: 760)"
                        value={form.district_code}
                        onChange={e => setForm({ ...form, district_code: e.target.value })}
                    />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <input
                        className="form-control mb-2"
                        placeholder="Latitude"
                        value={form.lat}
                        onChange={e => setForm({ ...form, lat: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input
                        className="form-control mb-2"
                        placeholder="Longitude"
                        value={form.lng}
                        onChange={e => setForm({ ...form, lng: e.target.value })}
                    />
                </div>
            </div>

            <select
                className="form-select mb-2"
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
            >
                <option value="rooftop">Rooftop</option>
                <option value="lounge">Lounge</option>
                <option value="club">Club</option>
                <option value="pub">Pub</option>
            </select>

            <select
                className="form-select mb-2"
                value={form.price_range}
                onChange={e => setForm({ ...form, price_range: e.target.value })}
            >
                <option value="low">Giá thấp</option>
                <option value="medium">Trung bình</option>
                <option value="high">Cao</option>
            </select>
            <h6 className="mt-3">Trạng thái hợp tác</h6>

            <div className="d-flex gap-4 mb-3">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="partner_status"
                        id="partner"
                        value="partner"
                        checked={form.partner_status === "partner"}
                        onChange={e =>
                            setForm({ ...form, partner_status: e.target.value })
                        }
                    />
                    <label className="form-check-label" htmlFor="partner">
                        🤝 Hợp tác
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="partner_status"
                        id="non_partner"
                        value="non_partner"
                        checked={form.partner_status === "non_partner"}
                        onChange={e =>
                            setForm({ ...form, partner_status: e.target.value })
                        }
                    />
                    <label className="form-check-label" htmlFor="non_partner">
                        🚫 Không hợp tác
                    </label>
                </div>
            </div>

            <h6>Hình ảnh</h6>
            {form.images.map((img: string, i: number) => (
                <input
                    key={i}
                    className="form-control mb-2"
                    placeholder={i === 0 ? "Ảnh cover" : "Ảnh phụ"}
                    value={img}
                    onChange={e => {
                        const images = [...form.images]
                        images[i] = e.target.value
                        setForm({ ...form, images })
                    }}
                />
            ))}

            <button
                className="btn btn-sm btn-secondary mb-3"
                onClick={() => setForm({ ...form, images: [...form.images, ""] })}
            >
                ➕ Thêm ảnh
            </button>
            <h6 className="mt-4">Nội dung chi tiết</h6>

            {form.sections.map((sec: any, i: number) => (
                <div key={i} className="border rounded p-2 mb-2">
                    <input
                        className="form-control mb-2"
                        placeholder={`Tiêu đề mục ${i + 1}`}
                        value={sec.title}
                        onChange={e => {
                            const sections = [...form.sections]
                            sections[i].title = e.target.value
                            setForm({ ...form, sections })
                        }}
                    />

                    <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Nội dung"
                        value={sec.content}
                        onChange={e => {
                            const sections = [...form.sections]
                            sections[i].content = e.target.value
                            setForm({ ...form, sections })
                        }}
                    />

                    <button
                        className="btn btn-sm btn-outline-danger mt-2"
                        onClick={() => {
                            const sections = form.sections.filter((_: any, idx: number) => idx !== i)
                            setForm({ ...form, sections })
                        }}
                    >
                        ❌ Xóa mục
                    </button>
                </div>
            ))}

            <button
                className="btn btn-sm btn-secondary mb-3"
                onClick={() =>
                    setForm({
                        ...form,
                        sections: [...form.sections, { title: "", content: "" }],
                    })
                }
            >
                ➕ Thêm mục nội dung
            </button>

            <h6>Giờ mở cửa</h6>
            {form.openingHours.map((oh: any, i: number) => (
                <div key={i} className="d-flex gap-2 align-items-center mb-2">
                    <span style={{ width: 90 }}>
                        {DAYS.find(d => d.value === oh.day)?.label}
                    </span>
                    <input
                        type="time"
                        value={oh.open}
                        onChange={e => {
                            const openingHours = [...form.openingHours]
                            openingHours[i].open = e.target.value
                            setForm({ ...form, openingHours })
                        }}
                    />
                    <input
                        type="time"
                        value={oh.close}
                        onChange={e => {
                            const openingHours = [...form.openingHours]
                            openingHours[i].close = e.target.value
                            setForm({ ...form, openingHours })
                        }}
                    />
                </div>
            ))}

            <div className="d-flex gap-2 mt-3">
                <button
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    💾 {loading ? "Đang lưu..." : "Lưu"}
                </button>
                <button
                    className="btn btn-outline-light"
                    onClick={() => navigate("/admin/bars")}
                >
                    Hủy
                </button>
            </div>
        </div>
    )
}
