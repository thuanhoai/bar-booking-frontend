// services/adminTable.service.ts
import { http } from "../../../services/http"

export const adminTableService = {
    // lấy bàn theo bar
    getByBar(barId: number) {
        return http.get(`/tables/bar/${barId}`)
    },

    getById(id: number) {
        return http.get(`/tables/${id}`)
    },

    create(data: any) {
        return http.post("/tables", data)
    },

    update(id: number, data: any) {
        return http.put(`/tables/${id}`, data)
    },

    remove(id: number) {
        return http.delete(`/tables/${id}`)
    },
}
