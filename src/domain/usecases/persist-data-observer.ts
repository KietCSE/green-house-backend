import { IInsideMemory } from "../repositories/insite-mem";
import { IObserver } from "../repositories/observer";
import { IDataRepository } from "../repositories/data-repository";
import { InsideMemRepository } from "../../infrastructure/repositories/inside-mem-repository";


export class PersistDataOberver implements IObserver {

    constructor(
        private dataRepository: IDataRepository,
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        try {
            const isSaved = await this.dataRepository.saveData(String(data), feed)
            if (isSaved) console.log("saved data to db")
            else console.log("Data is invalid, can not save")

            InsideMemRepository.getInstance().set(data, feed)

            console.log("save data to inside mem")
        }
        catch (error) {
            console.error("Can not save data")
            console.log(error)
        }
    }
}