interface Props {
    name: string
    address: string
    lat?: number
    lng?: number
}

export default function BarMap({ name, address, lat, lng }: Props) {
    if (!lat || !lng) return null

    const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`
    const directionUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`

    return (
        <section className="mt-5">
            <h2 className="fw-bold mb-3">📍 Vị trí & chỉ đường</h2>

            <div className="ratio ratio-16x9 rounded overflow-hidden mb-3">
                <iframe
                    src={mapSrc}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            <div className="d-flex align-items-center justify-content-between">
                <div className="text-secondary">
                    <strong className="text-white">{name}</strong>
                    <div>{address}</div>
                </div>

                <a
                    href={directionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-primary"
                >
                    🧭 Chỉ đường
                </a>
            </div>
        </section>
    )
}
