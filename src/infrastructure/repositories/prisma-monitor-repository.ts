import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { Data, MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class MonitorRepository implements IMonitorRepository {
    public async findDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
        return monitor
    }

}




