import axios from "axios"

const axiosClient = axios.create({
    baseURL: "https://mock-api.local", // sau này đổi API thật
    timeout: 10000,
})

export default axiosClient
