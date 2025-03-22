import { IInsideMemory } from "../repositories/insite-mem";
import { IObserver } from "../repositories/observer";
import { IDataRepository } from "../repositories/data-repository";


export class PersistDataOberver implements IObserver {

    constructor(
        private dataRepository: IDataRepository,
        private insideMemRepository: IInsideMemory
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        await this.dataRepository.saveData(String(data), feed)
        const isSave = this.insideMemRepository.set(data, feed)
        if (isSave === false) {
            throw new Error("Can not save data inside memory")
        }
    }

}