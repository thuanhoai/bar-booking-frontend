import type { Bar } from "../types"

interface Props {
    bar: Bar
    onBook: () => void
}

export default function BarStickyBooking({ bar, onBook }: Props) {
    const isPartner = bar.partnerStatus === "partner"

    return (
        <div
            className="bar-sticky-booking d-md-none"
            style={{ zIndex: 1050 }}
        >
            <div className="container px-2">
                <div className="bar-sticky-box">
                    {isPartner ? (
                        <button
                            className="bar-book-btn"
                            onClick={onBook}
                        >
                            📅 Đặt bàn ngay
                        </button>
                    ) : (
                        <div className="bar-book-disabled">
                            🚫 Quán chưa hỗ trợ đặt bàn online
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
