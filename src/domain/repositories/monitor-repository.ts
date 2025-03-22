import { MonitoringSubject } from "@prisma/client"

export interface IMonitorRepository {
    findDataBySubject(subject: string): Promise<MonitoringSubject | null>
    findAllSubject(): Promise<MonitoringSubject[] | null>
    loadAllSubjectName(): Promise<string[] | null>
    checkMonitor(subject: string, data: number): Promise<boolean>
    updateWarningStatus(subject: string, status: boolean): Promise<boolean>
    setAlertInformation(subject: string, alertDes: string, alertupperbound: number, alertlowerbound: number): Promise<boolean>
    addMonitorSubject(name: string, description: string, unit: string, upperbound: number, lowerbound: number, feed: string): Promise<boolean>
    loadAllFeedName(): Promise<string[]>
}





