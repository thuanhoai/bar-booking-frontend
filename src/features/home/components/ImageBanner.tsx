interface ImageBannerProps {
    image: string
    alt?: string
    ratio?: string // ví dụ "16/4"
}

export default function ImageBanner({
    image,
    alt = "Banner",
    ratio = "28/4",
}: ImageBannerProps) {
    return (
        <div
            style={{
                width: "100%",
                aspectRatio: ratio,
                overflow: "hidden",
                borderRadius: 16,
                margin: "24px 0",
            }}
        >
            <img
                src={image}
                alt={alt}
                loading="lazy"
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                }}
            />
        </div>
    )
}
