import { MonitoringSubject } from "@prisma/client"

export interface IDataRepository {
    findDataBySubject(subject: string, pageSize: number, page: number): Promise<MonitoringSubject | null>
    saveData(data: string, subject: string): Promise<void>
}