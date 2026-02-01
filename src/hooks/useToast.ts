export function useToast() {
    const success = (message: string) => {
        alert(`✅ ${message}`)
    }

    const error = (message: string) => {
        alert(`❌ ${message}`)
    }

    return { success, error }
}
