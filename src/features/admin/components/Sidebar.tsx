import { NavLink } from "react-router-dom"

export default function Sidebar() {
    return (
        <div
            style={{
                width: 240,
                background: "#1f1f1f",
            }}
            className="text-light p-3"
        >
            <h4 className="mb-4">ADMIN</h4>

            <ul className="nav flex-column gap-2">
                <li>
                    <NavLink to="/admin" className="nav-link text-light">
                        📊 Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/bars" className="nav-link text-light">
                        🍸 Quản lý Bar
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/blogs" className="nav-link text-light">
                        📝 Blog
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/bookings" className="nav-link text-light">
                        📅 Booking
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/admin/users" className="nav-link text-light">
                        👤 Users
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}
