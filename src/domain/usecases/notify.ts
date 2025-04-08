import { INotificationRepository } from "../repositories/notification-repository";

export class NotifyUseCase {
    constructor(private notificationRepository: INotificationRepository) { }

    public async getAllNotification(page: number, pageSize: number): Promise<any[] | null> {
        const notifications = await this.notificationRepository.findAllNotification(page, pageSize)
        return notifications
    }


    public async updateStatusNotification(value: boolean, notificationId: number): Promise<boolean> {
        const updated = await this.notificationRepository.updateReadStatus(value, notificationId)
        return updated
    }

}




