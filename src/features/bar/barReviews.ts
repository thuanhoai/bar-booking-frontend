export interface BarReview {
    id: number
    user: string
    rating: number
    comment: string
    date: string
}

export const barReviews: BarReview[] = [
    {
        id: 1,
        user: "Nguyễn Minh",
        rating: 5,
        comment: "View rất đẹp, cocktail ngon, nhân viên thân thiện.",
        date: "2025-12-20",
    },
    {
        id: 2,
        user: "Hoàng Anh",
        rating: 4,
        comment: "Không gian chill, hơi đông cuối tuần.",
        date: "2025-12-18",
    },
    {
        id: 3,
        user: "Thu Trang",
        rating: 5,
        comment: "Rooftop cực đỉnh, rất đáng tiền!",
        date: "2025-12-15",
    },
]
