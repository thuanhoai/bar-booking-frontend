export default function BarSkeleton() {
    return (
        <div className="card h-100 placeholder-glow">
            <div
                className="placeholder w-100"
                style={{ height: 180 }}
            />

            <div className="card-body">
                <h5 className="placeholder col-6"></h5>
                <p className="placeholder col-4"></p>
                <p className="placeholder col-8"></p>
                <p className="placeholder col-3"></p>
            </div>
        </div>
    )
}
