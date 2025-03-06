import { MonitoringSubject } from "@prisma/client"

export interface IMonitorRepository {
    findDataBySubject(subject: string): Promise<MonitoringSubject | null>
}