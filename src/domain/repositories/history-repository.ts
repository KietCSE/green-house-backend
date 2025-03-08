import { DeviceHistory } from "@prisma/client";

export interface IHistoryRepository {
    createHistory(info: string, deviceId: string): Promise<boolean | null>
    findAllHistory(page: number, pageSize: number): Promise<DeviceHistory[] | null>
}







