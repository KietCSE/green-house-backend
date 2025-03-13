import { INotificationRepository } from "../repositories/notification-repository";

export class NotifyUseCase {
    constructor(private notificationRepository: INotificationRepository) { }

    public async getAllNotification(): Promise<any[] | null> {
        const notifications = await this.notificationRepository.findAllNotification()
        return notifications
    }
}




