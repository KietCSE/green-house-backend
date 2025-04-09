import { NotificationInfo } from "../../presentation/dtos/notification"

export interface INotificationRepository {
    findAllNotification(page: number, pageSize: number): Promise<any[] | null>
    saveNotification(value: number, subject: String): Promise<NotificationInfo | null>
    updateReadStatus(value: boolean, notificationId: number): Promise<boolean>
}





