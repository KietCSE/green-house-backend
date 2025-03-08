import { Notification } from "@prisma/client"

export interface INotificationRepository {
    findAllNotification(): Promise<any[] | null>
    saveNotification(value: number, monitoringSubjectId: number): Promise<boolean | null>
}





