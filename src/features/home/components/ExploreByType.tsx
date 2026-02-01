import { useNavigate } from "react-router-dom"

interface ExploreItem {
    key: string
    label: string
    image: string
}

const ITEMS: ExploreItem[] = [
    { key: "karaoke", label: "KARAOKE", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
    { key: "club", label: "BAR CLUB", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
    { key: "beer", label: "BEER CLUB", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
    { key: "lounge", label: "LOUNGE", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
    { key: "pub", label: "PUB", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
    { key: "food", label: "NHÀ HÀNG", image: "https://as2.ftcdn.net/v2/jpg/03/81/87/61/1000_F_381876130_tZGTRygx0oPDLuleQf4ArNMIJHz3zmfi.jpg" },
]

export default function ExploreByType() {
    const navigate = useNavigate()

    return (
        <section className="container my-4 my-md-5">
            <h2 className="fw-bold mb-3 mb-md-4">
                Bạn đang tìm gì?
            </h2>

            <div className="row g-3 g-md-4">
                {ITEMS.map((item) => (
                    <div
                        key={item.key}
                        className="col-6 col-md-4"   // ✅ 3 cột desktop
                    >
                        <div
                            className="explore-card"
                            role="button"
                            tabIndex={0}
                            onClick={() =>
                                navigate(`/bars?type=${item.key}`)
                            }
                        >
                            <img
                                src={item.image}
                                alt={item.label}
                                loading="lazy"
                            />

                            <div className="explore-overlay">
                                <h3>{item.label}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
