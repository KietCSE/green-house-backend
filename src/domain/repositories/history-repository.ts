
export interface IHistoryRepository {
    createHistory(info: string, deviceId: number): Promise<boolean | null>
    findAllHistory(
        page: number,
        pageSize: number,
        startDate: Date | null,
        endDate: Date | null,
        indexOfDevice: string | null,
        actionInfo: string | null
    ): Promise<{ data: any[]; total: number } | null>
}







