import { } from '@prisma/client'
import { IHistoryRepository } from "../../domain/repositories/history-repository";

export class HandleHistoryUseCase {
    constructor(private historyRepository: IHistoryRepository) { }

    public async loadHistoryDevice(
        page: number,
        pageSize: number,
        startDate: Date | null,
        endDate: Date | null,
        name: string | null,
        actionInfo: string | null
    ): Promise<any | null> {
        const data = await this.historyRepository.findAllHistory(
            page,
            pageSize,
            startDate,
            endDate,
            name,
            actionInfo
        )
        return data
    }


}