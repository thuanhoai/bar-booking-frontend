import BarBookingForm from "./BarBookingForm"
import type { Bar } from "../types"

interface Props {
    show: boolean
    onClose: () => void
    bar: Bar
}

export default function BarBookingModal({ show, onClose, bar }: Props) {
    if (!show) return null

    return (
        <>
            {/* MODAL */}
            <div
                className="modal fade show d-block"
                tabIndex={-1}
                style={{ zIndex: 9999 }}
            >
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Đặt bàn – {bar.name}
                            </h5>
                            <button
                                className="btn-close"
                                onClick={onClose}
                            />
                        </div>

                        <div className="modal-body">
                            <BarBookingForm barId={bar.id} />
                        </div>
                    </div>
                </div>
            </div>

            {/* BACKDROP */}
            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 9998 }}
                onClick={onClose}
            />
        </>
    )
}

