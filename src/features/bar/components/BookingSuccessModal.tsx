interface Props {
    show: boolean
    phone: string
    onClose: () => void
}

export default function BookingSuccessModal({ show, phone, onClose }: Props) {
    if (!show) return null

    return (
        <>
            <div
                className="modal fade show d-block"
                style={{ zIndex: 10000 }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content text-center bg-dark text-light p-4">
                        <button
                            className="btn-close btn-close-white position-absolute end-0 top-0 m-3"
                            onClick={onClose}
                        />

                        <h4 className="text-purple mb-3">
                            ĐẶT CHỖ THÀNH CÔNG
                        </h4>

                        <p>
                            9Life sẽ gọi điện tới SĐT:
                            <br />
                            <strong className="fs-5">{phone}</strong>
                            <br />
                            để xác nhận trong vòng <strong>10 phút</strong> tới.
                        </p>

                        <p className="mb-4">
                            Vui lòng giữ liên lạc! <br />
                            Cảm ơn quý khách đã sử dụng <strong>9Life</strong>!
                        </p>

                        <button
                            className="btn btn-purple px-4"
                            onClick={onClose}
                        >
                            ĐÓNG
                        </button>
                    </div>
                </div>
            </div>

            <div
                className="modal-backdrop fade show"
                style={{ zIndex: 9999 }}
                onClick={onClose}
            />
        </>
    )
}
