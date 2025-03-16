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

    public async saveNotification(value: number, subject: string): Promise<boolean> {
        try {
            const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { name: subject } })

            if (monitoringSubject === null) {
                throw Error("Can not find the monitor")
            }

            const data = await prisma.notification.create({
                data: {
                    value,
                    monitoringSubjectId: monitoringSubject.id
                }
            })
            return true
        }
        catch (error) {
            throw Error("Can not save notification")
        }
    }

}