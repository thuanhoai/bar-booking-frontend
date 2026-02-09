import { useState } from "react"
import BarBookingForm from "./BarBookingForm"
import type { Bar } from "../types"

interface Props {
    show: boolean
    onClose: () => void
    bar: Bar
}

export default function BarBookingModal({ show, onClose, bar }: Props) {
    const [successPhone, setSuccessPhone] = useState<string | null>(null)

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
                    <div className="modal-content bg-dark text-light">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {successPhone ? "🎉 Đặt chỗ thành công" : `Đặt bàn – ${bar.name}`}
                            </h5>
                            <button
                                className="btn-close btn-close-white"
                                onClick={onClose}
                            />
                        </div>

                        <div className="modal-body text-center">
                            {!successPhone ? (
                                <BarBookingForm
                                    barId={bar.id}
                                    onSuccess={(phone) => setSuccessPhone(phone)}
                                />
                            ) : (
                                /* SUCCESS BOX */
                                <div className="p-4">
                                    <h4 className="text-uppercase text-purple mb-3">
                                        ĐẶT CHỖ THÀNH CÔNG
                                    </h4>

                                    <p>
                                        9Life sẽ gọi điện tới SĐT:
                                    </p>

                                    <h5 className="fw-bold mb-3">
                                        {successPhone}
                                    </h5>

                                    <p className="small">
                                        để xác nhận trong vòng <strong>10 phút</strong> tới.
                                        <br />
                                        Vui lòng giữ liên lạc!
                                    </p>

                                    <p className="mt-3">
                                        Cảm ơn quý khách đã sử dụng <strong>9Life</strong>!
                                    </p>

                                    <button
                                        className="btn btn-purple mt-3 px-4"
                                        onClick={onClose}
                                    >
                                        ĐÓNG
                                    </button>
                                </div>
                            )}
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
