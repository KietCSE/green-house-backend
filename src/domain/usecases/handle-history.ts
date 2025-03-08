import { } from '@prisma/client'
import { HistoryRepository } from '../../infrastructure/repositories/prisma-history-repository'

export class HandleHistoryUseCase {
    constructor(private historyRepository: HistoryRepository) { }

    public async loadHistoryDevice(page: number, pageSize: number): Promise<any | null> {
        const data = await this.historyRepository.findAllHistory(page, pageSize)
        return data
    }


}