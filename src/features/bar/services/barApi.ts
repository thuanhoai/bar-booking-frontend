import { mockBars } from "../../../services/mockBars"
import type { Bar } from "../types"

export const barApi = {
    getBars: async (): Promise<Bar[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(mockBars), 500)
        })
    },

    getBarById: async (id: number): Promise<Bar | undefined> => {
        return new Promise((resolve) => {
            setTimeout(
                () => resolve(mockBars.find((bar) => bar.id === id)),
                500
            )
        })
    },
}
