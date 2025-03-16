import { INotificationRepository } from "../repositories/notification-repository";

export class NotifyUseCase {
    constructor(private notificationRepository: INotificationRepository) { }

    public async getAllNotification(): Promise<any[] | null> {
        const notifications = await this.notificationRepository.findAllNotification()
        return notifications
    }

    // public async saveNotification(value: number, monitoringSubjectId: number): Promise<boolean | null> {
    //     const notification = await this.notificationRepository.saveNotification(value, monitoringSubjectId)
    //     return notification
    // }


}




