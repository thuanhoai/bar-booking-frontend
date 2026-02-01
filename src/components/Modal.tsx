interface ModalProps {
    title: string
    show: boolean
    onClose: () => void
    children: React.ReactNode
}

export default function Modal({ title, show, onClose, children }: ModalProps) {
    if (!show) return null

    return (
        <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button className="btn-close" onClick={onClose} />
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
            <div className="modal-backdrop fade show" />
        </div>
    )
}
