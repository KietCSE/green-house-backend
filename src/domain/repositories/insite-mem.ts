

export interface IInsideMemory {
    set(data: number, feed: string): boolean
    get(feed: string): { value: number; dateTime: Date } | null
    getAll(): Record<string, { value: number; dateTime: Date }>
} 