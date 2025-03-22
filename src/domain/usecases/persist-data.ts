import { IInsideMemory } from "../repositories/insite-mem";
import { IObserver } from "../repositories/observer";
import { IDataRepository } from "../repositories/data-repository";


export class PersistDataOberver implements IObserver {

    constructor(
        private dataRepository: IDataRepository,
        private insideMemRepository: IInsideMemory
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        try {
            await this.dataRepository.saveData(String(data), feed)
            console.log("saved data to db")

            this.insideMemRepository.set(data, feed)

            console.log("save data to inside mem")
        }
        catch (error) {
            console.error("Can not save data")
            console.log(error)
        }
    }
}