/* =========================
   BLOG TYPES
========================= */

export interface BlogSection {
    heading: string
    content: string
    image?: string | null
}

export interface Blog {
    id: number
    title: string
    slug: string
    excerpt: string
    image: string
    category: string
    date: string
    readTime: number   // ⚠️ QUAN TRỌNG: number
    sections?: BlogSection[]
}
