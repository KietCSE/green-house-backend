import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { Data, MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class MonitorRepository implements IMonitorRepository {
    public async findDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
        return monitor
    }

    public async findAllSubject(): Promise<MonitoringSubject[] | null> {
        const data = await prisma.monitoringSubject.findMany()
        return data
    }

    public async loadAllSubjectName(): Promise<string[] | null> {
        const listName = await prisma.monitoringSubject.findMany({ select: { name: true } })
        const stringName = listName.map((item) => item.name)
        return stringName
    }
}




