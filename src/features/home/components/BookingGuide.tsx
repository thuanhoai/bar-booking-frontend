import {
    FaMapMarkerAlt,
    FaPhoneAlt,
    FaHeadset,
    FaCheck,
    FaMusic,
} from "react-icons/fa"

const steps = [
    {
        icon: <FaMapMarkerAlt size={30} />,
        title: "CHỌN ĐỊA ĐIỂM",
        desc: "Hàng ngàn địa điểm ưu đãi",
        step: "1",
    },
    {
        icon: <FaPhoneAlt size={30} />,
        title: "GỌI ĐẶT CHỖ",
        desc: "0868 460 008",
        step: "2",
        group: "booking",
    },
    {
        icon: <FaHeadset size={30} />,
        title: "ĐẶT CHỖ ONLINE",
        desc: "Truy cập www.9life.com.vn",
        step: "2",
        group: "booking",
    },
    {
        icon: <FaCheck size={30} />,
        title: "XÁC NHẬN",
        desc: "Từ tổng đài viên 9LIFE",
        step: "3",
    },
    {
        icon: <FaMusic size={30} />,
        title: "TRẢI NGHIỆM",
        desc: "Trải nghiệm dịch vụ",
        step: "4",
    },
]

export default function BookingGuide() {
    const step1 = steps[0]
    const step2a = steps[1]
    const step2b = steps[2]
    const step3 = steps[3]
    const step4 = steps[4]

    return (
        <section className="booking-guide">
            <div className="container">
                {/* Header */}
                <div className="mb-4">
                    <h2 className="fw-bold text-white">
                        Hướng dẫn đặt chỗ
                    </h2>
                    <a href="#" className="booking-link">
                        Xem chi tiết hướng dẫn
                    </a>
                </div>

                {/* DESKTOP */}
                <div className="booking-steps-desktop">
                    {steps.map((item, index) => {
                        const prev = steps[index - 1]
                        const showOr =
                            prev?.group === "booking" &&
                            item.group === "booking"

                        return (
                            <div key={index} className="booking-step-desktop">
                                {index > 0 && (
                                    <div className="step-connector">
                                        {showOr ? "Hoặc" : "➜"}
                                    </div>
                                )}

                                <div className="step-icon">{item.icon}</div>
                                <h6 className="step-title">{item.title}</h6>
                                <p className="step-desc">{item.desc}</p>
                                <div className="step-number">{item.step}</div>
                            </div>
                        )
                    })}
                </div>

                {/* MOBILE */}
                <div className="booking-steps-mobile">
                    <StepMobile {...step1} />

                    <div className="step-option-mobile">
                        <StepMobile {...step2a} />
                        <div className="step-or-mobile">Hoặc</div>
                        <StepMobile {...step2b} />
                    </div>

                    <StepMobile {...step3} />
                    <StepMobile {...step4} />
                </div>
            </div>
        </section>
    )
}

/* Mobile step */
function StepMobile({ icon, title, desc, step }: any) {
    return (
        <div className="booking-step-mobile">
            <div className="step-icon-mobile">{icon}</div>
            <div className="step-title-mobile">{title}</div>
            <div className="step-desc-mobile">{desc}</div>
            <div className="step-number-mobile">{step}</div>
        </div>
    )
}
