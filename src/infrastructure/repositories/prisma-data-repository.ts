import { IDataRepository } from "../../domain/repositories/data-repository"
import prisma from '../../config/prisma-config'


export class DataRepository implements IDataRepository {

    public async saveData(data: string, feed: string): Promise<boolean> {
        try {
            console.log(feed)
            if (!data) return false
            const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { feed, delete: false } })
            if (!monitoringSubject) {
                throw Error("Can not find monitor or feed doesn't exist")
            }
            const newData = await prisma.data.create({
                data: {
                    value: data,
                    monitoringSubjectId: monitoringSubject.id
                }
            })
            return true
        }
        catch (error) {
            console.log(error)
            throw Error("Can not save data")
        }
    }

    public async findDataByDateAndSubject(
        monitoringSubjectId: number,
        pageSize: number,
        page: number,
        startDate?: Date,
        endDate?: Date
    ): Promise<{ data: any[]; total: number }> {
        // Kiểm tra monitoringSubject
        const monitoringSubject = await prisma.monitoringSubject.findFirst({
            where: { id: monitoringSubjectId, delete: false }
        });

        if (!monitoringSubject) {
            throw new Error("Monitoring subject doesn't exist");
        }

        try {

            const where: any = {
                monitoringSubjectId
            };

            if (startDate) {
                // Đặt startDate về đầu ngày (00:00:00.000)
                const adjustedStartDate = new Date(startDate);
                adjustedStartDate.setHours(0, 0, 0, 0);

                if (!endDate) endDate = new Date()
                // Đặt endDate về cuối ngày (23:59:59.999)
                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setHours(23, 59, 59, 999);

                where.date = {
                    gte: adjustedStartDate,
                    lte: adjustedEndDate
                };
            }

            const [data, total] = await Promise.all([
                prisma.data.findMany({
                    where,
                    select: {
                        value: true,
                        date: true
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: 'desc' }
                }),
                prisma.data.count({ where })
            ]);

            return { data, total };
        } catch (error) {
            console.error('Error in findDataByDateAndSubject:', error);
            throw new Error("Can not load data by date");
        }
    }
}




