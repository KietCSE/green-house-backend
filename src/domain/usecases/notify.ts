import { CacheNotificationDevice } from "../../infrastructure/repositories/inside-notification-device-repository";
import { CacheNotification } from "../../infrastructure/repositories/inside-notification-repository";
import { CacheNotificationScheduler } from "../../infrastructure/repositories/inside-notification-schedule-repository";
import { NotificationInfo } from "../../presentation/dtos/notification";
import { NotificationDevice, NotificationSchedule } from "../../presentation/dtos/notification-device";
import { INotificationRepository } from "../repositories/notification-repository";
// import { IUserRepository } from "../repositories/user-repository";

export class NotifyUseCase {
    constructor(
        private notificationRepository: INotificationRepository,
    ) { }

    public async getAllNotification(page: number, pageSize: number): Promise<any[] | null> {
        const notifications = await this.notificationRepository.findAllNotification(page, pageSize)
        return notifications
    }


    public async updateStatusNotification(value: boolean, notificationId: number): Promise<boolean> {
        const updated = await this.notificationRepository.updateReadStatus(value, notificationId)
        return updated
    }

    public pollingNotification(): any[] {
        let arrayData = []

        let cachedata = CacheNotification.getInstance().pop()
        if (cachedata) arrayData.push({ ...cachedata, type: "Data" })

        const cachedevice = CacheNotificationDevice.getInstance().pop()
        if (cachedevice) arrayData.push({ ...cachedevice, type: "Auto" })

        const cachescheduler = CacheNotificationScheduler.getInstance().pop()
        if (cachescheduler) arrayData.push({ ...cachescheduler, type: "Scheduler" })

        return arrayData
    }

    // public pollingNotificationDevice(): NotificationDevice | null {
    //     const data = CacheNotificationDevice.getInstance().pop()
    //     return data
    // }

    // public pollingNotificationScheduler(): NotificationSchedule | null {
    //     const data = CacheNotificationScheduler.getInstance().pop()
    //     return data
    // }
}




