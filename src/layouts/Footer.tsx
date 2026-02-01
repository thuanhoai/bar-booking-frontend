import {
    FaPhoneAlt,
    FaEnvelope,
    FaFacebookF,
} from "react-icons/fa"
import { SiZalo, SiWechat } from "react-icons/si"
import { BsTelegram } from "react-icons/bs"
import { RiKakaoTalkFill } from "react-icons/ri"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row gy-4">
                    {/* Cột 1 */}
                    <div className="col-md-3">
                        <h5 className="footer-title">THÔNG TIN LIÊN HỆ</h5>
                        <p>
                            <FaPhoneAlt /> Hotline CSKH: <b>+84 800 000 008</b>
                            <br />
                            Hoạt động 24/7 (Kể cả Lễ, Tết)
                        </p>
                        <p>
                            <FaEnvelope /> Email: barbooking.com.vn@gmail.com
                        </p>
                        <p>
                            <FaFacebookF /> www.facebook.com/barbooking.com.vn/
                        </p>
                    </div>

                    {/* Cột 2 */}
                    <div className="col-md-3">
                        <h5 className="footer-title">VỀ BAR</h5>
                        <ul className="footer-list">
                            <li>Tổng quan về barbooking</li>
                            <li>Liên hệ hợp tác</li>
                        </ul>
                    </div>

                    {/* Cột 3 */}
                    <div className="col-md-3">
                        <h5 className="footer-title">ĐIỀU KHOẢN SỬ DỤNG</h5>
                        <ul className="footer-list">
                            <li>Quy chế hoạt động</li>
                            <li>Điều khoản với Đối tác</li>
                            <li>Chính sách bảo mật thông tin</li>
                        </ul>
                    </div>

                    {/* Cột 4 */}
                    <div className="col-md-3">
                        <h5 className="footer-title">KẾT NỐI VỚI CHÚNG TÔI</h5>
                        <p>Liên hệ ngay! Chúng tôi luôn sẵn sàng hỗ trợ 24/7</p>

                        <div className="footer-social">
                            <SiWechat />
                            <SiZalo />
                            <BsTelegram />
                            <RiKakaoTalkFill />
                            <FaFacebookF />
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    © 2025 BarBooking – Đặt bàn bar nhanh chóng
                </div>
            </div>
        </footer>
    )
}
