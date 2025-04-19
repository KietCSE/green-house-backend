import { ICacheNotification } from './../../domain/repositories/cache-notification-repository'
import { NotificationDevice } from '../../presentation/dtos/notification-device'
import { UserRepository } from './prisma-auth-repository'

// Queue to store notifications which will be sent to user 
export class CacheNotificationDevice implements ICacheNotification {

    private device: Map<number,NotificationDevice[]> = new Map()
    private userRepository = new UserRepository()
    private static instance: CacheNotificationDevice
    constructor() { }

    static getInstance(): CacheNotificationDevice {
        if (!CacheNotificationDevice.instance) CacheNotificationDevice.instance = new CacheNotificationDevice()
        return CacheNotificationDevice.instance
    }

    public pop(userId: number): NotificationDevice | null {
        const userQueue = this.device.get(userId)
        if (!userQueue || userQueue.length === 0) return null
        const notification = userQueue.shift()!
        if (userQueue.length === 0) {
            this.device.delete(userId)
        } else {
            this.device.set(userId, userQueue)
        }

        console.log(`After pop for ${userId}:`, this.device)
        return notification
    }

    public async push(obj: NotificationDevice) {
        const allUserId = await this.userRepository.getAllUserId()
        for (const userId of allUserId) {
            if (!this.device.has(userId)) {
                this.device.set(userId, [])
            }
        
            this.device.get(userId)!.push(obj) // ! -> never null
            console.log(`After push for ${userId}:`, this.device)
        }
    }
}