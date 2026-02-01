import type { Bar } from "../features/bar/types"

const KEY = "recently_viewed_bars"
const MAX = 5

export function addRecentlyViewed(bar: Bar) {
    const raw = localStorage.getItem(KEY)
    const list: Bar[] = raw ? JSON.parse(raw) : []

    const filtered = list.filter((b) => b.id !== bar.id)
    const updated = [bar, ...filtered].slice(0, MAX)

    localStorage.setItem(KEY, JSON.stringify(updated))
}

export function getRecentlyViewed(): Bar[] {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
}
