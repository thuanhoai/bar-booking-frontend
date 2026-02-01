import { z } from "zod"

/* =========================
   BAR
========================= */
export interface OpeningHour {
    day:
    | "Thứ 2"
    | "Thứ 3"
    | "Thứ 4"
    | "Thứ 5"
    | "Thứ 6"
    | "Thứ 7"
    | "Chủ nhật"
    open: string // "18:00"
    close: string // "02:00"
}
export interface Bar {
    id: number
    name: string

    /** Địa chỉ đầy đủ (hiển thị UI) */
    address: string

    /** Dùng cho filter / SEO */
    city: string
    district: string

    /** Phân loại */
    type: "lounge" | "club" | "rooftop" | "karaoke"

    /** Mức giá */
    priceRange: "low" | "mid" | "high"

    /** Đánh giá */
    rating: number
    bookingCount?: number
    /** Trạng thái hợp tác */
    partnerStatus: "partner" | "non-partner"
    /** Ảnh đại diện */
    image: string

    /** Gallery ảnh (hero section) */
    gallery?: string[]

    /** Mô tả chi tiết */
    description: string

    /** Hotline */
    phone?: string

    /** Giờ mở cửa (optional – cho SEO sau) */

    images?: string[]
    openingHours?: OpeningHour[]
    lat?: number
    lng?: number
}

/* =========================
   BOOKING
========================= */

export const bookingSchema = z.object({
    name: z.string().min(2, "Vui lòng nhập tên"),
    phone: z.string().min(9, "SĐT không hợp lệ"),
    date: z.string(),
    time: z.string(),
    people: z.number().min(1),
    note: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>
