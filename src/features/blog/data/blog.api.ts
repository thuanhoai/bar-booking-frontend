import { http } from "../../../services/http"
import type { Blog } from "../types"

export const blogApi = {
    async getBlogs(): Promise<Blog[]> {
        const res = await http.get<Blog[]>("/blog")
        return res.data
    },

    async getBlogById(id: number): Promise<Blog> {
        const res = await http.get<Blog>(`/blog/${id}`)
        return res.data
    },
}
