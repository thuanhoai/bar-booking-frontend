import type { BarReview } from "../barReviews"

interface Props {
    rating: number
    reviews: BarReview[]
}

export default function BarRatingSummary({ rating, reviews }: Props) {
    const total = reviews.length

    const countByStar = (star: number) =>
        reviews.filter((r) => r.rating === star).length

    return (
        <div className="bg-dark p-4 rounded text-white">
            <div className="d-flex align-items-center mb-3">
                <div className="display-5 fw-bold me-3">{rating}</div>
                <div>
                    <div className="fw-semibold">Rất tốt</div>
                    <div className="text-secondary">
                        {total} đánh giá
                    </div>
                </div>
            </div>

            {[5, 4, 3, 2, 1].map((star) => {
                const count = countByStar(star)
                const percent = total ? (count / total) * 100 : 0

                return (
                    <div
                        key={star}
                        className="d-flex align-items-center mb-2"
                    >
                        <span className="me-2">{star}⭐</span>
                        <div className="progress flex-grow-1 me-2">
                            <div
                                className="progress-bar bg-warning"
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                        <span className="text-secondary small">
                            {count}
                        </span>
                    </div>
                )
            })}
        </div>
    )
}
