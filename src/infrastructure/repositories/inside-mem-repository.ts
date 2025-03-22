import { IInsideMemory } from "../../domain/repositories/insite-mem";


export class InsideMemRepository implements IInsideMemory {

    private list: Record<string, number> = {}

    constructor() {
        // init value for all the feed
        this.list = {
            "temp": 120,
            "abc": 100,
            "game": 569
        }
    }

    public set(data: number, feed: string): boolean {
        this.list[feed] = data
        return true
    }

    public get(feed: string): number {
        return this.list[feed] ?? null
    }
}