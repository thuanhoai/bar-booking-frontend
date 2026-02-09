import { z } from "zod"

/* =========================
   BAR
========================= */

export interface OpeningHour {
    day: string
    open: string
    close: string
}

/* ✅ SECTION CỦA BAR */
export interface BarSection {
    id: number
    title: string
    content: string
    sortOrder?: number
    status?: string
}

export interface Bar {
    id: number
    name: string
    address: string
    city: string
    district: string
    type: string
    priceRange: string
    rating: number
    bookingCount: number
    partnerStatus: string
    image?: string
    images?: string[]
    gallery?: string[]
    description?: string
    lat?: number
    lng?: number
    phone?: string

    openingHours?: OpeningHour[]

    /* ✅ THÊM – KHÔNG ẢNH HƯỞNG LOGIC CŨ */
    sections?: BarSection[]
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
