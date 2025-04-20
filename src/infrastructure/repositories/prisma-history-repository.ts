import { IHistoryRepository } from "../../domain/repositories/history-repository"
import { PrismaClient, User } from "@prisma/client";
import prisma from '../../config/prisma-config'
import { DeviceHistoryInfo } from "@prisma/client";

export class HistoryRepository implements IHistoryRepository {
    public async createHistory(info: DeviceHistoryInfo, deviceId: number): Promise<boolean | null> {
        try {
            const newHistory = await prisma.deviceHistory.create({ data: { info, deviceId } })
            return true
        }
        catch (error) {
            throw Error("Can not save history data")
        }
    }

    public async findAllHistory(
        page: number,
        pageSize: number,
        startDate: Date | null,
        endDate: Date | null,
        deviceName: string | null,
        actionInfo: string | null
    ): Promise<{ data: any[]; total: number } | null> {
        try {
            const where: any = {}

            if (startDate || endDate) {
                where.date = {}
                if (startDate) {
                    // Đặt startDate về đầu ngày (00:00:00.000)
                    where.date.gte = new Date(startDate.setHours(0, 0, 0, 0));
                }
                if (endDate) {
                    // Đặt endDate về cuối ngày (23:59:59.999)
                    const adjustedEndDate = new Date(endDate);
                    adjustedEndDate.setHours(23, 59, 59, 999);
                    where.date.lte = adjustedEndDate;
                }
            }

            if (deviceName) {
                where.device = {
                    name: {
                        contains: deviceName,
                        mode: 'insensitive' // Không phân biệt hoa thường
                    }
                };
            }

            if (actionInfo) {
                where.info = actionInfo
            }

            console.log(where)

            const [data, total] = await Promise.all([
                prisma.deviceHistory.findMany({
                    where,
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    select: {
                        info: true,
                        date: true,
                        deviceId: true,
                        device: { select: { name: true } }
                    },
                    orderBy: { date: 'desc' }
                }),

                prisma.deviceHistory.count({ where })
            ])

            return { data, total }

        } catch (error) {
            throw new Error("Can not get history data");
        }
    }
}