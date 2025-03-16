import { Notification } from "@prisma/client"

export interface INotificationRepository {
    findAllNotification(): Promise<any[] | null>
    saveNotification(value: number, subject: String): Promise<boolean | null>
}





