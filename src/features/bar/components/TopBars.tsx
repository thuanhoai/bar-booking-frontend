import type { Bar } from "../types"
import { mockBars } from "../../../services/mockBars"

export const barApi = {
    /**
     * Lấy danh sách bar
     */
    getBars: async (): Promise<Bar[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockBars)
            }, 500)
        })
    },

    /**
     * Lấy chi tiết 1 bar theo id
     */
    getBarById: async (id: number): Promise<Bar | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockBars.find((bar) => bar.id === id))
            }, 500)
        })
    },
}
