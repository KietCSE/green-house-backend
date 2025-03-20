
export interface IObserver {
    execute(data: number, feed: string): Promise<void>
}

