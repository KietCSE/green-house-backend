import { IDataRepository } from "../../domain/repositories/data-repository"
import { MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class DataRepository implements IDataRepository {
    public async findDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        const data = prisma.monitoringSubject.findFirst({
            where: { name: subject },
            select: {
                id: true,
                name: true,
                upperbound: true,
                lowerbound: true,
                Data: {
                    take: 10, // Chỉ lấy 10 dòng đầu
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
}




