interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline-primary'
    className?: string
}

export default function Button({
    children,
    onClick,
    variant = 'primary',
    className = '',
}: ButtonProps) {
    return (
        <button
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
