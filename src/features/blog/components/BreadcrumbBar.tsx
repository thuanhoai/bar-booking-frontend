import { Link } from "react-router-dom"

export interface CrumbItem {
    label: string
    to?: string
}

interface Props {
    items: CrumbItem[]
}

export default function BreadcrumbBar({ items }: Props) {
    return (
        <div className="container my-3">
            <div className="app-breadcrumb">
                {items.map((item, i) => {
                    const last = i === items.length - 1

                    return (
                        <span key={i}>
                            {item.to && !last ? (
                                <Link to={item.to}>
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="current">
                                    {item.label}
                                </span>
                            )}

                            {!last && <span className="sep">/</span>}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
