import { Notification } from "@prisma/client"

export interface INotificationRepository {
    findAllNotification(page: number, pageSize: number): Promise<any[] | null>
    saveNotification(value: number, subject: String): Promise<boolean | null>
}





