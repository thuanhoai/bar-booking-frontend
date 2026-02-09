import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { adminTableService } from "../services/adminTable.service"

export default function TableForm() {
    const navigate = useNavigate()
    const { id, barId } = useParams()
    const isEdit = Boolean(id)

    const [form, setForm] = useState<any>({
        bar_id: barId,
        name: "",
        min_people: 2,
        max_people: 6,
        is_vip: false,
        status: "available",
    })

    useEffect(() => {
        if (isEdit) {
            adminTableService.getById(Number(id))
                .then(res => setForm(res.data))
        }
    }, [id, isEdit])

    const submit = async () => {
        if (isEdit) {
            await adminTableService.update(Number(id), form)
        } else {
            await adminTableService.create(form)
        }
        navigate(-1)
    }

    return (
        <div className="card bg-dark text-light p-3">
            <h5>{isEdit ? "✏️ Sửa bàn" : "➕ Thêm bàn"}</h5>

            <input className="form-control mb-2"
                placeholder="Tên bàn"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
            />

            <div className="row">
                <div className="col">
                    <input type="number" className="form-control mb-2"
                        placeholder="Min người"
                        value={form.min_people}
                        onChange={e => setForm({ ...form, min_people: e.target.value })}
                    />
                </div>
                <div className="col">
                    <input type="number" className="form-control mb-2"
                        placeholder="Max người"
                        value={form.max_people}
                        onChange={e => setForm({ ...form, max_people: e.target.value })}
                    />
                </div>
            </div>

            <label className="mb-2">
                <input
                    type="checkbox"
                    checked={form.is_vip}
                    onChange={e => setForm({ ...form, is_vip: e.target.checked })}
                /> VIP
            </label>

            <select className="form-select mb-3"
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
            >
                <option value="available">Có sẵn</option>
                <option value="reserved">Đã đặt</option>
                <option value="disabled">Ngưng sử dụng</option>
            </select>

            <button className="btn btn-primary" onClick={submit}>
                💾 Lưu
            </button>
        </div>
    )
}
