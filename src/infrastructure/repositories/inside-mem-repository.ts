import { IInsideMemory } from "../../domain/repositories/insite-mem";


export class InsideMemRepository implements IInsideMemory {

    private list: Record<string, number> = {}

    constructor() { this.list = {} }

    public set(data: number, feed: string): boolean {
        if (feed in this.list) {
            return false
        }
        this.list[feed] = data
        return true
    }

    public get(feed: string): number {
        return this.list[feed] ?? null
    }
}