import { Notification } from '@prisma/client'
import prisma from '../../config/prisma-config'
import { INotificationRepository } from '../../domain/repositories/notification-repository'

export class NotificationRepository implements INotificationRepository {
    public async findAllNotification(): Promise<any | null> {
        try {
            const notifications = await prisma.notification.findMany({
                include: {
                    monitor: true
                }
            })
            return notifications
        }
        catch (error) {
            throw Error("Can not get all notifications")
        }
    }

    public async saveNotification(value: number, monitoringSubjectId: number): Promise<boolean> {
        try {
            const data = await prisma.notification.create({
                data: {
                    value,
                    monitoringSubjectId
                }
            })
            return true
        }
        catch (error) {
            throw Error("Can not save notification")
        }

    }
}