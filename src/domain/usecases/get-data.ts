
import { InsideMemRepository } from "../../infrastructure/repositories/inside-mem-repository"
import { IDataRepository } from "../repositories/data-repository"


export class GetDataUseCase {
    constructor(
        private dataRepository: IDataRepository,
    ) { }

    public async getDataByDateAndSubject(
        id: number,
        pageSize: number,
        page: number,
        startDate?: Date,
        endDate?: Date
    ): Promise<any> {
        const data = await this.dataRepository.findDataByDateAndSubject(
            id,
            pageSize,
            page,
            startDate,
            endDate
        )
        return data
    }

    public getCurentData() {
        const data = InsideMemRepository.getInstance().getAll()
        return data
    }
}