export default function BarCardSkeleton() {
    return (
        <div className="card h-100 shadow-sm border-0 overflow-hidden">
            {/* Image skeleton */}
            <div
                className="placeholder-glow"
                style={{
                    height: 220,
                    backgroundColor: "#1f1f1f",
                }}
            >
                <span
                    className="placeholder w-100 h-100"
                    style={{ display: "block" }}
                />
            </div>

            {/* Content skeleton */}
            <div className="card-body d-flex flex-column">
                {/* Title */}
                <div className="placeholder-glow mb-2">
                    <span className="placeholder col-8"></span>
                </div>

                {/* Location */}
                <div className="placeholder-glow mb-3">
                    <span className="placeholder col-6"></span>
                </div>

                {/* Footer */}
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="placeholder col-3"></span>
                    <span className="placeholder col-4"></span>
                </div>
            </div>
        </div>
    )
}
