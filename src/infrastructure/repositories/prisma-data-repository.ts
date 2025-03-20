import { IDataRepository } from "../../domain/repositories/data-repository"
import prisma from '../../config/prisma-config'


export class DataRepository implements IDataRepository {

    public async saveData(data: string, subject: string): Promise<void> {
        try {
            const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
            if (!monitoringSubject) {
                throw Error("Can not find monitor")
            }
            const newData = await prisma.data.create({
                data: {
                    value: data,
                    monitoringSubjectId: monitoringSubject.id
                }
            })

        }
        catch (error) {
            throw Error("Can not save data")
        }
    }

    public async findDataByDateAndSubject(
        subject: string,
        pageSize: number,
        page: number,
        startDate?: Date,
        endDate?: Date
    ): Promise<any[]> {
        try {

            let data

            if (!endDate || !startDate) {
                data = await prisma.data.findMany({
                    where: {
                        subject: { name: subject }
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
                        subject: { name: subject }
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




