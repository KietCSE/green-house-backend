import { DataRepository } from "../../infrastructure/repositories/prisma-data-repository"
import { MonitoringSubject } from '@prisma/client'

export class GetDataUseCase {
    constructor(private dataRepository: DataRepository) { }

    public async getDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        return this.dataRepository.findDataBySubject(subject)
    }
}