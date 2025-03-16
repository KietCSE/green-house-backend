import { IDataRepository } from "../../domain/repositories/data-repository"
import { MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class DataRepository implements IDataRepository {
    public async findDataBySubject(subject: string, pageSize: number, page: number): Promise<MonitoringSubject | null> {
        const data = prisma.monitoringSubject.findFirst({
            where: { name: subject },
            select: {
                id: true,
                name: true,
                description: true,
                upperbound: true,
                lowerbound: true,
                warning: true,
                alertDes: true,
                alertupperbound: true,
                alertlowerbound: true,
                email: true,
                Data: {
                    skip: (page - 1) * pageSize,
                    take: pageSize, // Chỉ lấy 10 dòng đầu
                    select: {
                        value: true,
                        date: true
                    },
                    orderBy: { date: "desc" } // Có thể sắp xếp theo `date` mới nhất

                }
            }
        })
        return data
    }


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
}




