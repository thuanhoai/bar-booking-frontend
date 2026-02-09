import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"
import FloatingContact from "../features/blog/components/FloatingContact"
export default function MainLayout() {
    return (
        <>
            <Header />

            <main className="container my-4">
                <Outlet />
                <FloatingContact />
            </main>

            <Footer />
        </>
    )
}
