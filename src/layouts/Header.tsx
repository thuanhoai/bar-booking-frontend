import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
    FaBars,
    FaTimes,
    FaSearch,
    FaPhoneAlt,
    FaFacebookF,
} from "react-icons/fa"
import { SiZalo } from "react-icons/si"

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [keyword, setKeyword] = useState("")
    const navigate = useNavigate()

    // 🔥 SAME normalize logic as BarListPage
    const normalizeText = (str: string) =>
        str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim()

    const handleSearch = () => {
        const q = normalizeText(keyword)
        if (!q) return

        navigate(`/bars?keyword=${encodeURIComponent(q)}`)
        setKeyword("")
        setOpenSearch(false)
    }

    return (
        <>
            {/* ================= DESKTOP ================= */}
            <header className="d-none d-md-block bg-dark text-white border-bottom">
                <div className="container d-flex align-items-center gap-4 py-3">
                    <Link
                        to="/"
                        className="fw-bold fs-4 text-white text-decoration-none"
                    >
                        🍸 BarBooking
                    </Link>

                    <input
                        type="text"
                        className="form-control rounded-pill px-4"
                        placeholder="Tìm bar, lounge, rooftop..."
                        style={{ maxWidth: 420 }}
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && handleSearch()
                        }
                    />
                </div>
            </header>

            {/* ================= MOBILE HEADER ================= */}
            <header className="d-md-none header-mobile">
                <div className="mobile-topbar d-flex align-items-center justify-content-between px-3">
                    {/* LEFT MENU */}
                    <button
                        className="icon-btn"
                        onClick={() => setOpenMenu(true)}
                    >
                        <FaBars size={22} />
                    </button>

                    <Link to="/" className="mobile-logo">
                        🍸 BarBooking
                    </Link>

                    {/* RIGHT SEARCH */}
                    <button
                        className="icon-btn"
                        onClick={() => setOpenSearch(true)}
                    >
                        <FaSearch size={20} />
                    </button>
                </div>
            </header>

            {/* ================= MOBILE SEARCH ================= */}
            {openSearch && (
                <div
                    className="mobile-search-overlay"
                    onClick={() => setOpenSearch(false)}
                >
                    <div
                        className="mobile-search-bar"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <input
                            autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Tìm bar, rooftop, lounge..."
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSearch()
                            }
                        />

                        <button
                            className="icon-btn"
                            onClick={() => setOpenSearch(false)}
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* ================= MOBILE MENU ================= */}
            <div className={`mobile-menu ${openMenu ? "show" : ""}`}>
                <div className="mobile-menu-header">
                    <h4>MENU</h4>
                    <button
                        className="icon-btn"
                        onClick={() => setOpenMenu(false)}
                    >
                        <FaTimes size={22} />
                    </button>
                </div>

                <div className="mobile-menu-body">
                    <div className="menu-item">
                        <FaPhoneAlt />
                        <span>Hotline: +84 86 000008</span>
                    </div>

                    <div className="menu-item">
                        <SiZalo />
                        <span>Hoài Thuận</span>
                    </div>

                    <div className="menu-item">
                        <FaFacebookF />
                        <span>facebook.com/barbooking.com.vn</span>
                    </div>
                </div>
            </div>

            {/* ================= BACKDROP ================= */}
            {openMenu && (
                <div
                    className="mobile-backdrop"
                    onClick={() => setOpenMenu(false)}
                />
            )}
        </>
    )
}
