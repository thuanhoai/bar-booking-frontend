import { http } from "../../../services/http"
import type { Bar } from "../types"

type ApiResponse<T> = {
    data: T
}

export const barApi = {
    async getBars(): Promise<Bar[]> {
        const res = await http.get<Bar[] | ApiResponse<Bar[]>>("/bars")

        // Nếu backend trả { data: [...] }
        if (Array.isArray((res.data as any)?.data)) {
            return (res.data as ApiResponse<Bar[]>).data
        }

        // Nếu backend trả thẳng [...]
        return res.data as Bar[]
    },

    async getBarById(id: number): Promise<Bar> {
        const res = await http.get<Bar | ApiResponse<Bar>>(`/bars/${id}`)

        if ((res.data as any)?.data) {
            return (res.data as ApiResponse<Bar>).data
        }

        return res.data as Bar
    },
}
