import { Notification } from "@prisma/client"
import { NotificationData } from "../../presentation/dtos/notification"

export interface INotificationRepository {
    findAllNotification(page: number, pageSize: number): Promise<any[] | null>
    saveNotification(value: number, subject: String): Promise<NotificationData | null>
}





