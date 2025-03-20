import { MonitoringSubject } from "@prisma/client"

export interface IDataRepository {
    // findDataBySubject(subject: string, pageSize: number, page: number): Promise<MonitoringSubject | null>
    findDataByDateAndSubject(subject: string, pageSize: number, page: number, startDate?: Date, endDate?: Date): Promise<any[]>
    saveData(data: string, subject: string): Promise<void>
}