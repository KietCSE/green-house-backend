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

}




