import { http } from "../../../services/http"

export const adminBookingService = {
    getAll() {
        return http.get("/bookings")
    },

    getByBar(barId: number) {
        return http.get(`/bookings/bar/${barId}`)
    },

    getById(id: number) {
        return http.get(`/bookings/${id}`)
    },

    updateStatus(id: number, status: string) {
        return http.put(`/bookings/${id}/status`, { status })
    },

    delete(id: number) {
        return http.delete(`/bookings/${id}`)
    },
}
