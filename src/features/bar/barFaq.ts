// src/features/bar/barFaq.ts

/**
 * Kiểu dữ liệu FAQ cho bar
 * Dùng cho:
 * - UI Accordion
 * - FAQ Schema (SEO)
 */
export interface BarFAQ {
    question: string
    answer: string
}

/**
 * FAQ mặc định cho trang chi tiết quán bar
 * Có thể dùng chung cho tất cả bar
 * (sau này có thể override theo từng bar)
 */
export const barFaqs: BarFAQ[] = [
    {
        question: "Quán bar có cần đặt bàn trước không?",
        answer:
            "Bạn nên đặt bàn trước để đảm bảo có chỗ ngồi đẹp, đặc biệt vào cuối tuần hoặc khung giờ cao điểm."
    },
    {
        question: "Quán bar mở cửa đến mấy giờ?",
        answer:
            "Hầu hết các quán bar mở cửa từ chiều tối đến khoảng 1–2 giờ sáng. Một số quán có thể mở muộn hơn tùy ngày."
    },
    {
        question: "Có yêu cầu độ tuổi khi vào quán bar không?",
        answer:
            "Đa số các quán bar yêu cầu khách từ 18 tuổi trở lên. Bạn nên mang theo giấy tờ tùy thân khi cần."
    },
    {
        question: "Quán bar có tính phí vào cửa không?",
        answer:
            "Một số quán bar có thể thu phí vào cửa hoặc yêu cầu mức chi tiêu tối thiểu, tùy chính sách từng địa điểm."
    },
    {
        question: "Có thể hủy hoặc thay đổi lịch đặt bàn không?",
        answer:
            "Bạn có thể hủy hoặc thay đổi lịch đặt bàn trước giờ hẹn. Vui lòng liên hệ sớm để được hỗ trợ tốt nhất."
    }
]

/**
 * (OPTIONAL – nâng cao)
 * Helper tạo FAQ Schema JSON-LD
 * → Dùng lại cho SEO, tránh duplicate code
 */
export const buildFaqSchema = (faqs: BarFAQ[]) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
        },
    })),
})
