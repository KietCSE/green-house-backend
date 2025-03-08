
import { MonitoringSubject } from '@prisma/client'
import { IDataRepository } from "../../domain/repositories/data-repository"

export class GetDataUseCase {
    constructor(private dataRepository: IDataRepository) { }

    public async getDataBySubject(subject: string, pageSize: number, page: number): Promise<MonitoringSubject | null> {
        const data = await this.dataRepository.findDataBySubject(subject, pageSize, page)
        return data
    }
}