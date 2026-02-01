import type { BarReview } from "../barReviews"

interface Props {
    reviews: BarReview[]
}

export default function BarReviewList({ reviews }: Props) {
    return (
        <div className="mt-4">
            {reviews.map((r) => (
                <div
                    key={r.id}
                    className="border-bottom border-secondary pb-3 mb-3"
                >
                    <div className="d-flex justify-content-between">
                        <strong>{r.user}</strong>
                        <span className="text-warning">
                            {r.rating}⭐
                        </span>
                    </div>

                    <p className="text-secondary mb-1">
                        {r.comment}
                    </p>

                    <small className="text-muted">
                        {r.date}
                    </small>
                </div>
            ))}
        </div>
    )
}
