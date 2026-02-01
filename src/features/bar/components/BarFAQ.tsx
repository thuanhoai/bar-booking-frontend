import type { BarFAQ as BarFAQType } from "../barFaq"
import { barFaqs as defaultFaqs } from "../barFaq"

interface Props {
    faqs?: BarFAQType[]
}

export default function BarFAQ({ faqs = defaultFaqs }: Props) {
    if (!faqs || faqs.length === 0) return null

    return (
        <section className="container my-5">
            <h2 className="fw-bold mb-4 text-white">
                Câu hỏi thường gặp
            </h2>

            <div
                className="accordion accordion-flush"
                id="barFaqAccordion"
            >
                {faqs.map((faq, index) => {
                    const collapseId = `bar-faq-${index}`

                    return (
                        <div
                            key={collapseId}
                            className="accordion-item bg-transparent border-bottom border-secondary"
                        >
                            <h3 className="accordion-header">
                                <button
                                    className={`accordion-button bg-transparent text-white ${index !== 0 ? "collapsed" : ""
                                        }`}
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#${collapseId}`}
                                    aria-expanded={index === 0}
                                    aria-controls={collapseId}
                                >
                                    {faq.question}
                                </button>
                            </h3>

                            <div
                                id={collapseId}
                                className={`accordion-collapse collapse ${index === 0 ? "show" : ""
                                    }`}
                                data-bs-parent="#barFaqAccordion"
                            >
                                <div className="accordion-body text-secondary">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
