import { http } from "../../../services/http"

export const adminBlogService = {
    getAll() {
        // 🔥 FIX: /blog (KHÔNG PHẢI /blogs)
        return http.get("/blog/admin/all")
    },

    getById(id: number) {
        return http.get(`/blog/${id}`)
    },

    create(data: any) {
        return http.post("/blog", data)
    },

    update(id: number, data: any) {
        return http.put(`/blog/${id}`, data)
    },

    remove(id: number) {
        return http.delete(`/blog/${id}`)
    },
}
