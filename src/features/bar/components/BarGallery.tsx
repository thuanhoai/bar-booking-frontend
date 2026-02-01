import { useState } from "react"
import BarGalleryModal from "./BarGalleryModal"

interface Props {
    images: string[]
    name?: string
    onBook?: () => void
}

export default function BarGallery({ images, name, onBook }: Props) {
    const [open, setOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    if (!images?.length) return null

    const openGallery = (index: number) => {
        setActiveIndex(index)
        setOpen(true)
    }

    return (
        <>
            <section className="bar-gallery">
                <div className="row g-3">
                    {/* IMAGE LỚN */}
                    <div className="col-md-8">
                        <div
                            className="gallery-main position-relative"
                            onClick={() => openGallery(0)}
                        >
                            <img src={images[0]} alt={name} />

                            {/* CTA ĐẶT CHỖ */}
                            <button
                                className="btn btn-primary gallery-book-btn"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onBook?.()
                                }}
                            >
                                Đặt chỗ ngay
                            </button>
                        </div>
                    </div>

                    {/* ẢNH NHỎ */}
                    <div className="col-md-4">
                        <div className="row g-3">
                            {images.slice(1, 5).map((img, index) => (
                                <div className="col-6 col-md-12" key={index}>
                                    <div
                                        className="gallery-thumb"
                                        onClick={() =>
                                            openGallery(index + 1)
                                        }
                                    >
                                        <img src={img} alt={name} />

                                        {index === 3 &&
                                            images.length > 5 && (
                                                <div className="gallery-more">
                                                    +{images.length - 5}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {open && (
                <BarGalleryModal
                    images={images}
                    index={activeIndex}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    )
}
