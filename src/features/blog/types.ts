/* =========================
   BLOG TYPES
========================= */

export interface BlogSection {
    heading: string
    content: string
    image?: string | null
    sortOrder?: number
}

export interface Blog {
    id: number
    title: string
    slug: string
    excerpt: string
    image: string
    category: string
    date: string

    // ✅ FIX: backend đang trả number
    readTime: number

    // ✅ ADMIN cần
    status?: "draft" | "published"

    sections?: BlogSection[]
}
