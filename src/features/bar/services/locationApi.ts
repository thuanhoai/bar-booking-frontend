export const locationApi = {
    getCities: async () => {
        const res = await fetch("https://provinces.open-api.vn/api/p/")
        return res.json()
    },

    getDistrictsByCityCode: async (cityCode: number) => {
        const res = await fetch(
            `https://provinces.open-api.vn/api/p/${cityCode}?depth=2`
        )
        const data = await res.json()
        return data.districts || []
    },
}
