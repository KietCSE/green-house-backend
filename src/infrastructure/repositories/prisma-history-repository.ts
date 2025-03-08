import { IHistoryRepository } from "../../domain/repositories/history-repository"
import { PrismaClient, User } from "@prisma/client";
import prisma from '../../config/prisma-config'
import { DeviceHistoryInfo } from "@prisma/client";

export class HistoryRepository implements IHistoryRepository {
    public async createHistory(info: DeviceHistoryInfo, deviceId: string): Promise<boolean | null> {
        try {
            const newHistory = await prisma.deviceHistory.create({ data: { info, deviceId } })
            return true
        }
        catch (error) {
            throw Error("Can not save history data")
        }
    }

    public async findAllHistory(page: number, pageSize: number): Promise<any[] | null> {
        try {
            const data = prisma.deviceHistory.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                select: {
                    info: true,
                    date: true,
                    deviceId: true
                }
            })
            return data
        }
        catch (error) {
            throw Error("Can not get history data")
        }

    }
}