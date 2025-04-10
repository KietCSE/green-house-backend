import { } from '@prisma/client'
import { IHistoryRepository } from "../../domain/repositories/history-repository";

export class HandleHistoryUseCase {
    constructor(private historyRepository: IHistoryRepository) { }

    public async loadHistoryDevice(page: number, pageSize: number, startDate?: Date, endDate?: Date): Promise<any | null> {
        const data = await this.historyRepository.findAllHistory(page, pageSize, startDate, endDate)
        return data
    }


}