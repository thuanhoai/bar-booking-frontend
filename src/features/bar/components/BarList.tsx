import BarCard from "./BarCard"
import type { Bar } from "../types"

interface Props {
    bars: Bar[]
}

export default function BarList({ bars }: Props) {
    if (bars.length === 0) {
        return <p>Không tìm thấy quán bar phù hợp.</p>
    }

    return (
        <div className="row g-4">
            {bars.map((bar) => (
                <div className="col-md-3 col-sm-6" key={bar.id}>
                    <BarCard bar={bar} />
                </div>
            ))}
        </div>
    )
}
