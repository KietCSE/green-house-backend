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
        const monitoringSubject = await prisma.monitoringSubject.findFirst({
            where: { id: monitoringSubjectId, delete: false }
        });
        if (!monitoringSubject) {
            throw new Error("Monitoring subject doesn't exist");
        }

        try {
            let data;
            let total;

            if (!endDate || !startDate) {
                // Truy vấn dữ liệu phân trang khi không có startDate/endDate
                data = await prisma.data.findMany({
                    where: {
                        monitoringSubjectId: monitoringSubjectId
                    },
                    select: {
                        value: true,
                        date: true
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: "desc" }
                });

                // Đếm tổng số bản ghi
                total = await prisma.data.count({
                    where: {
                        monitoringSubjectId: monitoringSubjectId
                    }
                });
            } else {
                // Truy vấn dữ liệu phân trang khi có startDate/endDate
                data = await prisma.data.findMany({
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate
                        },
                        monitoringSubjectId: monitoringSubjectId
                    },
                    select: {
                        value: true,
                        date: true
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: "desc" }
                });

                // Đếm tổng số bản ghi
                total = await prisma.data.count({
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate
                        },
                        monitoringSubjectId: monitoringSubjectId
                    }
                });
            }

            // Trả về object chứa dữ liệu và tổng số bản ghi
            return {
                data,
                total
            };
        } catch (error) {
            console.log(error);
            throw new Error("Can not load data by date");
        }
    }
}




