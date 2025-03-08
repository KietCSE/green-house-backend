import { DataRepository } from "../../infrastructure/repositories/prisma-data-repository"
import { MonitoringSubject } from '@prisma/client'

export class GetDataUseCase {
    constructor(private dataRepository: DataRepository) { }

    public async getDataBySubject(subject: string, pageSize: number, page: number): Promise<MonitoringSubject | null> {
        const data = await this.dataRepository.findDataBySubject(subject, pageSize, page)
        return data
    }
}