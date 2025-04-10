import { DeviceHistory } from "@prisma/client";

export interface IHistoryRepository {
    createHistory(info: string, deviceId: string): Promise<boolean | null>
    findAllHistory(page: number, pageSize: number, startDate?: Date, endDate?: Date): Promise<{ data: any[]; total: number } | null>
}







