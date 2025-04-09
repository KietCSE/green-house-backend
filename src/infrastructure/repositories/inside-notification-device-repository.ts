import { ICacheNotification } from './../../domain/repositories/cache-notification-repository'
import { NotificationDevice } from '../../presentation/dtos/notification-device'

// Queue to store notifications which will be sent to user 
export class CacheNotificationDevice implements ICacheNotification {

    private device: NotificationDevice[] = []
    private static instance: CacheNotificationDevice
    constructor() { }

    static getInstance(): CacheNotificationDevice {
        if (!CacheNotificationDevice.instance) CacheNotificationDevice.instance = new CacheNotificationDevice()
        return CacheNotificationDevice.instance
    }

    public pop(): NotificationDevice | null {
        if (this.device.length === 0) return null
        const notification = this.device[0]
        this.device = this.device.slice(1)
        console.log(this.device)
        return notification
    }

    public push(obj: NotificationDevice) {
        this.device.push(obj)
        console.log(this.device)
    }
}