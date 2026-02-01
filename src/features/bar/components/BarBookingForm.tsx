import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import type { BookingFormData } from "../types"
import { bookingSchema } from "../types"
import { useToast } from "../../../hooks/useToast"

interface Props {
    barId: number
}

export default function BarBookingForm({ barId }: Props) {
    const { success, error } = useToast()
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            people: 1,
        },
    })

    const onSubmit = async (data: BookingFormData) => {
        try {
            setLoading(true)

            await new Promise((res) => setTimeout(res, 1000))

            console.log("BOOKING:", { ...data, barId })

            success("Đặt bàn thành công!")
            reset()
        } catch {
            error("Có lỗi xảy ra, vui lòng thử lại")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="booking-form-ui"
        >
            {/* Tên */}
            <input
                placeholder="Tên"
                className={`form-control form-dark ${errors.name ? "is-invalid" : ""}`}
                {...register("name")}
            />
            {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}

            {/* Phone */}
            <input
                placeholder="Số điện thoại"
                className={`form-control form-dark ${errors.phone ? "is-invalid" : ""}`}
                {...register("phone")}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}

            {/* Date + Time */}
            <div className="row g-3">
                <div className="col-6">
                    <input
                        type="date"
                        className={`form-control form-dark ${errors.date ? "is-invalid" : ""}`}
                        {...register("date")}
                    />
                    {errors.date && (
                        <div className="invalid-feedback">{errors.date.message}</div>
                    )}
                </div>

                <div className="col-6">
                    <select
                        className={`form-control form-dark ${errors.time ? "is-invalid" : ""}`}
                        {...register("time")}
                    >
                        <option value="">Chọn giờ</option>
                        {[
                            "17:00", "18:00", "19:00", "20:00",
                            "21:00", "22:00", "23:00"
                        ].map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                    {errors.time && (
                        <div className="invalid-feedback">{errors.time.message}</div>
                    )}
                </div>
            </div>

            {/* People */}
            <input
                type="number"
                min={1}
                placeholder="Số người"
                className={`form-control form-dark ${errors.people ? "is-invalid" : ""}`}
                {...register("people", { valueAsNumber: true })}
            />
            {errors.people && (
                <div className="invalid-feedback">{errors.people.message}</div>
            )}

            {/* Note */}
            <textarea
                placeholder="Ghi chú thêm..."
                rows={3}
                className="form-control form-dark"
                {...register("note")}
            />

            {/* Submit */}
            <button
                className="btn booking-submit-btn w-100"
                disabled={loading}
            >
                {loading ? "Đang xử lý..." : "Đặt ngay"}
            </button>

            {/* Hotline */}
            <div className="booking-hotline">
                Hoặc gọi tới: <strong>0868460008</strong>
                <div className="small text-muted">
                    Để đặt chỗ và được tư vấn.
                </div>
            </div>
        </form>
    )
}
