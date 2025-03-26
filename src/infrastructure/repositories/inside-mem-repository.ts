import { IInsideMemory } from "../../domain/repositories/insite-mem";

export class InsideMemRepository implements IInsideMemory {
    private list: Record<string, { value: number; dateTime: Date }> = {};
    private static instance: InsideMemRepository;

    constructor() { }

    static getInstance() {
        if (!InsideMemRepository.instance) {
            InsideMemRepository.instance = new InsideMemRepository()
        }
        return InsideMemRepository.instance
    }

    public set(data: number, feed: string): boolean {
        this.list[feed] = { value: data, dateTime: new Date() };
        return true;
    }

    public get(feed: string): { value: number; dateTime: Date } | null {
        return this.list[feed] ?? null;
    }

    public getAll(): Record<string, { value: number; dateTime: Date }> {
        return this.list;
    }
}
