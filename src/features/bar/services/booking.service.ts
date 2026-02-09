// features/bar/services/booking.service.ts
import { http } from "../../../services/http"

export const bookingService = {
    create(data: any) {
        return http.post("/bookings", data)
    },
}
