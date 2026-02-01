interface Props {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

export default function Pagination({ page, totalPages, onChange }: Props) {
    if (totalPages <= 1) return null

    return (
        <nav className="mt-4">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 && "disabled"}`}>
                    <button
                        className="page-link"
                        onClick={() => onChange(page - 1)}
                    >
                        ‹
                    </button>
                </li>

                {Array.from({ length: totalPages }).map((_, i) => (
                    <li
                        key={i}
                        className={`page-item ${page === i + 1 && "active"}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onChange(i + 1)}
                        >
                            {i + 1}
                        </button>
                    </li>
                ))}

                <li className={`page-item ${page === totalPages && "disabled"}`}>
                    <button
                        className="page-link"
                        onClick={() => onChange(page + 1)}
                    >
                        ›
                    </button>
                </li>
            </ul>
        </nav>
    )
}
