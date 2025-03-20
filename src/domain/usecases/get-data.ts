
import { IDataRepository } from "../repositories/data-repository"

export class GetDataUseCase {
    constructor(private dataRepository: IDataRepository) { }

    public async getDataByDateAndSubject(
        subject: string,
        pageSize: number,
        page: number,
        startDate?: Date,
        endDate?: Date
    ): Promise<any[]> {
        const data = await this.dataRepository.findDataByDateAndSubject(
            subject,
            pageSize,
            page,
            startDate,
            endDate
        )
        return data
    }

}