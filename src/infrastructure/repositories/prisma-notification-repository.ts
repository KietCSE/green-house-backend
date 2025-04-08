import { Notification } from '@prisma/client'
import prisma from '../../config/prisma-config'
import { INotificationRepository } from '../../domain/repositories/notification-repository'
import { NotificationData } from '../../presentation/dtos/notification'

export class NotificationRepository implements INotificationRepository {

    public async findAllNotification(page: number, pageSize: number): Promise<any | null> {
        try {
            const notifications = await prisma.notification.findMany({
                select: {
                    id: true,
                    date: true,
                    value: true,
                    read: true,
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


    public async saveNotification(value: number, feed: string): Promise<NotificationData | null> {
        try {
            const monitoringSubject = await prisma.monitoringSubject.findFirst({ where: { feed } })

            if (monitoringSubject === null) {
                throw Error("Can not find the monitor")
            }

            const data = await prisma.notification.create({
                data: {
                    value,
                    monitoringSubjectId: monitoringSubject.id
                },
            })
            if (!data) return null

            return new NotificationData(data, monitoringSubject)
        }
        catch (error) {
            throw Error("Can not save notification")
        }
    }


    public async updateReadStatus(value: boolean, notificationId: number): Promise<boolean> {
        try {
            const notification = await prisma.notification.findFirst({ where: { id: notificationId } })

            if (!notification) throw Error("Can not find the notìication")

            const updated = await prisma.notification.update({
                where: { id: notificationId },
                data: { read: value }
            })

            // console.log(updated)

            return !!updated
        }
        catch (error) {
            console.log(error)
            throw Error("Can not update status")
        }
    }

}