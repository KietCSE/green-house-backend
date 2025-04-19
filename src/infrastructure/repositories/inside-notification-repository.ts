import { ICacheNotification } from './../../domain/repositories/cache-notification-repository'
import { NotificationInfo } from '../../presentation/dtos/notification'
import { UserRepository } from './prisma-auth-repository'

enum NotificationType {
    Auto = 'Auto',
    Scheduler = 'Scheduler',
    Data = 'Data'
}

// Queue to store notifications which will be sent to user 
export class CacheNotification implements ICacheNotification {

    private data: Map<number,NotificationInfo[]> = new Map()
    private userRepository = new UserRepository()
    private static instance: CacheNotification
    constructor() { }

    static getInstance(): CacheNotification {
        if (!CacheNotification.instance) CacheNotification.instance = new CacheNotification()
        return CacheNotification.instance
    }

    public pop(userId: number): NotificationInfo | null {
        const userQueue = this.data.get(userId)
        if (!userQueue || userQueue.length === 0) return null
        const notification = userQueue.shift()!
        if (userQueue.length === 0) {
            this.data.delete(userId)
        } else {
            this.data.set(userId, userQueue)
        }

        console.log(`After pop for ${userId}:`, this.data)
        return notification
    }

    public async push(obj: NotificationInfo) {
        const allUserId = await this.userRepository.getAllUserId()
        for (const userId of allUserId) {
            if (!this.data.has(userId)) {
                this.data.set(userId, [])
            }
        
            this.data.get(userId)!.push(obj) // ! -> never null
            console.log(`After push for ${userId}:`, this.data)
        }
    }
}