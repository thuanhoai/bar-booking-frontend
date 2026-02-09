import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleLogin = async () => {
        setError("")

        if (!email || !password) {
            setError("Vui lòng nhập email và mật khẩu")
            return
        }

        setLoading(true)

        try {
            // 🔥 DEMO: login cứng (sửa sau thành API)
            if (email === "admin@9life.vn" && password === "123456") {
                localStorage.setItem("admin_logged_in", "true")
                navigate("/admin")
            } else {
                setError("Email hoặc mật khẩu không đúng")
            }
        } catch (e) {
            setError("Có lỗi xảy ra, thử lại sau")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh", background: "#0f172a" }}
        >
            <div
                className="card p-4"
                style={{
                    width: 380,
                    background: "#020617",
                    color: "#fff",
                    borderRadius: 16,
                }}
            >
                <h4 className="text-center mb-4 fw-bold">
                    🔐 ADMIN LOGIN
                </h4>

                {error && (
                    <div className="alert alert-danger py-2">
                        {error}
                    </div>
                )}

                <input
                    className="form-control mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="form-control mb-4"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="btn w-100 fw-bold"
                    style={{
                        background:
                            "linear-gradient(90deg,#a855f7,#ec4899)",
                        border: "none",
                        color: "#fff",
                        borderRadius: 999,
                    }}
                >
                    {loading ? "Đang đăng nhập..." : "ĐĂNG NHẬP"}
                </button>
            </div>
        </div>
    )
}
