import { MonitoringSubject } from "@prisma/client"

export interface IMonitorRepository {
    findDataBySubject(subject: string): Promise<MonitoringSubject | null>
    findAllSubject(): Promise<MonitoringSubject[] | null>
    checkMonitor(subject: string, data: number): Promise<boolean>
    updateWarningStatus(subject: string, status: boolean): Promise<boolean>
    setAlertInformation(id: number, alertDes: string, alertupperbound: number, alertlowerbound: number, status: boolean, email: boolean): Promise<boolean>
    addMonitorSubject(name: string, description: string, unit: string, upperbound: number, lowerbound: number, feed: string): Promise<boolean>
    updateMonitorSubject(name: string, description: string, unit: string, upperbound: number, lowerbound: number, id: number): Promise<boolean>
    loadAllFeedName(): Promise<string[]>
    deleteMonitorSubject(id: number): Promise<string | null>
}





