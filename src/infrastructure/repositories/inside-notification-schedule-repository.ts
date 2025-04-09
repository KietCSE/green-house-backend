import { ICacheNotification } from '../../domain/repositories/cache-notification-repository'
import { NotificationDevice, NotificationSchedule } from '../../presentation/dtos/notification-device'

// Queue to store notifications which will be sent to user 
export class CacheNotificationScheduler implements ICacheNotification {

    private device: NotificationSchedule[] = []
    private static instance: CacheNotificationScheduler
    constructor() { }

    static getInstance(): CacheNotificationScheduler {
        if (!CacheNotificationScheduler.instance) CacheNotificationScheduler.instance = new CacheNotificationScheduler()
        return CacheNotificationScheduler.instance
    }

    public pop(): NotificationSchedule | null {
        if (this.device.length === 0) return null
        const notification = this.device[0]
        this.device = this.device.slice(1)
        console.log(this.device)
        return notification
    }

    public push(obj: NotificationSchedule) {
        this.device.push(obj)
        console.log(this.device)
    }
}