import { useNavigate } from "react-router-dom"
import type { Bar } from "../types"

type BarCardProps = {
    bar: Bar
    layout?: "vertical" | "horizontal" | "mobile"
}

export default function BarCard({
    bar,
    layout = "horizontal",
}: BarCardProps) {
    const navigate = useNavigate()

    const isPartner = bar.partnerStatus === "partner"

    /* ================= MOBILE ================= */
    if (layout === "mobile") {
        return (
            <div
                role="button"
                onClick={() => navigate(`/bars/${bar.id}`)}
                style={{
                    display: "flex",
                    gap: 12,
                    padding: 12,
                    background: "#1f1f2b",
                    borderRadius: 12,
                    cursor: "pointer",
                }}
            >
                {/* IMAGE */}
                <img
                    src={bar.image}
                    alt={bar.name}
                    loading="lazy"
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: 10,
                        objectFit: "cover",
                        flexShrink: 0,
                    }}
                />

                {/* INFO */}
                <div
                    style={{
                        flex: 1,
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h6
                        style={{
                            fontSize: 15,
                            fontWeight: 600,
                            color: "#fff",
                            marginBottom: 4,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {bar.name}
                    </h6>

                    <p
                        style={{
                            fontSize: 13,
                            color: "#b5b5c3",
                            marginBottom: 6,
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {bar.address}
                    </p>

                    {/* PARTNER BADGE */}
                    <span
                        style={{
                            alignSelf: "flex-start",
                            padding: "4px 10px",
                            fontSize: 12,
                            borderRadius: 999,
                            background: isPartner
                                ? "linear-gradient(135deg,#ffb703,#ffd166)"
                                : "#2f2f3a",
                            color: isPartner ? "#000" : "#aaa",
                            fontWeight: 600,
                        }}
                    >
                        {isPartner ? "✔ Đã hợp tác" : "Chưa hợp tác"}
                    </span>
                </div>
            </div>
        )
    }

    /* ================= DESKTOP ================= */
    const isHorizontal = layout === "horizontal"

    return (
        <div
            role="button"
            onClick={() => navigate(`/bars/${bar.id}`)}
            style={{
                display: "flex",
                flexDirection: isHorizontal ? "row" : "column",
                background: "#2b2b2b",
                borderRadius: 12,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                border: isPartner ? "1px solid #ffb70355" : "none",
            }}
        >
            {/* IMAGE */}
            <div
                style={{
                    width: isHorizontal ? 260 : "100%",
                    height: isHorizontal ? 160 : 180,
                    flexShrink: 0,
                    position: "relative",
                    background: "#111",
                }}
            >
                <img
                    src={bar.image}
                    alt={bar.name}
                    loading="lazy"
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                    }}
                />

                {/* RATING */}
                <span
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.7)",
                        padding: "4px 8px",
                        borderRadius: 8,
                        fontSize: 12,
                        color: "#fff",
                    }}
                >
                    ⭐ {bar.rating}
                </span>

                {/* PARTNER BADGE */}
                {isPartner && (
                    <span
                        style={{
                            position: "absolute",
                            bottom: 8,
                            left: 8,
                            background:
                                "linear-gradient(135deg,#ffb703,#ffd166)",
                            color: "#000",
                            padding: "4px 10px",
                            fontSize: 12,
                            borderRadius: 999,
                            fontWeight: 700,
                        }}
                    >
                        ✔ Đối tác 9Life
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <div
                style={{
                    padding: 14,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <h5
                    style={{
                        fontSize: 17,
                        fontWeight: 600,
                        marginBottom: 6,
                        color: "#fff",
                        lineHeight: 1.2,
                    }}
                >
                    {bar.name}
                </h5>

                <p
                    style={{
                        fontSize: 13,
                        color: "#aaa",
                        marginBottom: 10,
                    }}
                >
                    {bar.district}, {bar.city}
                </p>

                <div
                    style={{
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: 13,
                    }}
                >
                    <span
                        style={{
                            background: "#3a3a3a",
                            padding: "4px 10px",
                            borderRadius: 20,
                            fontSize: 12,
                            textTransform: "capitalize",
                        }}
                    >
                        {bar.type}
                    </span>

                    {bar.priceRange && (
                        <span style={{ color: "#ffb703" }}>
                            💰 {bar.priceRange}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
