import { ICacheNotification } from './../../domain/repositories/cache-notification-repository'
import { NotificationInfo } from '../../presentation/dtos/notification'

enum NotificationType {
    Auto = 'Auto',
    Scheduler = 'Scheduler',
    Data = 'Data'
}

// Queue to store notifications which will be sent to user 
export class CacheNotification implements ICacheNotification {

    private data: NotificationInfo[] = []
    private static instance: CacheNotification
    constructor() { }

    static getInstance(): CacheNotification {
        if (!CacheNotification.instance) CacheNotification.instance = new CacheNotification()
        return CacheNotification.instance
    }

    public pop(): NotificationInfo | null {
        if (this.data.length === 0) return null
        const notification = this.data[0]
        this.data = this.data.slice(1)
        console.log(this.data)
        return notification
    }

    public push(obj: NotificationInfo) {
        this.data.push(obj)
        console.log(this.data)
    }
}