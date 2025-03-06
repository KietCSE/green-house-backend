import { MonitoringSubject } from "@prisma/client"

export interface IDataRepository {
    findDataBySubject(subject: string): Promise<MonitoringSubject | null>
}