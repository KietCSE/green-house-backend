

export interface IInsideMemory {
    set(data: number, feed: string): boolean
    get(feed: string): number
}