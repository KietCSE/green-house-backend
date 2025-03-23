import { IDataRepository } from "../../domain/repositories/data-repository"
import prisma from '../../config/prisma-config'


export class DataRepository implements IDataRepository {

    public async saveData(data: string, feed: string): Promise<boolean> {
        try {
            console.log(feed)
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
        feed: string,
        pageSize: number,
        page: number,
        startDate?: Date,
        endDate?: Date
    ): Promise<any[]> {

        const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { feed, delete: false } })
        if (!monitoringSubject) {
            throw Error("monitor or feed doesn't exist")
        }

        try {

            let data

            if (!endDate || !startDate) {
                data = await prisma.data.findMany({
                    where: {
                        subject: { feed, delete: false }
                    },
                    select: {
                        value: true,
                        date: true
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: "desc" }
                })
            }
            else {
                data = await prisma.data.findMany({
                    where: {
                        date: {
                            gte: startDate,
                            lte: endDate
                        },
                        subject: { feed, delete: false }
                    },
                    select: {
                        value: true,
                        date: true
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: "desc" }
                })
            }

            return data
        }
        catch (error) {
            console.log(error)
            throw new Error("Can not load data by date")
        }
    }
}




