import { http } from "../../../services/http"

export const adminBarService = {
    getAll() {
        return http.get("/bars")
    },

    getById(id: number) {
        return http.get(`/bars/${id}`)
    },

    create(data: any) {
        return http.post("/bars", data)
    },

    update(id: number, data: any) {
        return http.put(`/bars/${id}`, data)
    },

    remove(id: number) {
        return http.delete(`/bars/${id}`)
    },
}
