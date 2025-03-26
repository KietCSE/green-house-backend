import { Notification } from '@prisma/client'
import prisma from '../../config/prisma-config'
import { INotificationRepository } from '../../domain/repositories/notification-repository'

export class NotificationRepository implements INotificationRepository {
    public async findAllNotification(page: number, pageSize: number): Promise<any | null> {
        try {
            const notifications = await prisma.notification.findMany({
                select: {
                    date: true,
                    value: true,
                    monitor: true
                },
                skip: (page - 1) * pageSize,
                take: pageSize,
                orderBy: { date: "desc" }
            })
            return notifications
        }
        catch (error) {
            throw Error("Can not get all notifications")
        }
    }

    public async saveNotification(value: number, feed: string): Promise<boolean> {
        try {
            const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { feed } })

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