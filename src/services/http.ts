import axios from "axios"

export const http = axios.create({
    baseURL: "http://localhost:3000/api", // ⚠️ đổi nếu backend bạn khác port
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

// OPTIONAL: interceptor để debug
http.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("HTTP ERROR:", {
            url: error?.config?.url,
            status: error?.response?.status,
            data: error?.response?.data,
        })
        return Promise.reject(error)
    }
)
