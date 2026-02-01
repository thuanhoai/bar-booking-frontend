import { useEffect, useState } from "react"

interface Props {
    images: string[]
    index: number
    onClose: () => void
}

export default function BarGalleryModal({
    images,
    index,
    onClose,
}: Props) {
    const [current, setCurrent] = useState(index)

    const prev = () =>
        setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))

    const next = () =>
        setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))

    /** ESC close */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowLeft") prev()
            if (e.key === "ArrowRight") next()
        }
        window.addEventListener("keydown", onKey)
        return () => window.removeEventListener("keydown", onKey)
    }, [])

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-90 d-flex align-items-center justify-content-center"
            style={{ zIndex: 1055 }}
            onClick={onClose}
        >
            {/* Image */}
            <img
                src={images[current]}
                alt="Fullscreen"
                className="img-fluid"
                style={{ maxHeight: "90vh", maxWidth: "90vw" }}
                onClick={(e) => e.stopPropagation()}
            />

            {/* Close */}
            <button
                className="btn btn-light position-absolute top-0 end-0 m-4"
                onClick={onClose}
            >
                ✕
            </button>

            {/* Left */}
            <button
                className="btn btn-light position-absolute start-0 top-50 translate-middle-y ms-3"
                onClick={(e) => {
                    e.stopPropagation()
                    prev()
                }}
            >
                ‹
            </button>

            {/* Right */}
            <button
                className="btn btn-light position-absolute end-0 top-50 translate-middle-y me-3"
                onClick={(e) => {
                    e.stopPropagation()
                    next()
                }}
            >
                ›
            </button>
        </div>
    )
}
