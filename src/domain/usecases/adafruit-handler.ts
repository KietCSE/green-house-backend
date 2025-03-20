import { IObserver } from "../repositories/observer"


export class AdafruitHandler {
    private observers: IObserver[]

    constructor() {
        this.observers = []
    }

    public subscribe(obj: IObserver): void {
        this.observers.push(obj)
    }

    public detach(obj: IObserver): void {
        this.observers.filter(observers => observers !== obj)
    }

    public notify(data: number, feed: string): void {
        this.observers.forEach(observer => observer.execute(data, feed))
    }
}