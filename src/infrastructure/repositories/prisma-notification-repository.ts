import { Notification } from '@prisma/client'
import prisma from '../../config/prisma-config'
import { INotificationRepository } from '../../domain/repositories/notification-repository'
import { NotificationInfo } from '../../presentation/dtos/notification'
import { CacheNotification } from './inside-notification-repository'


export class NotificationRepository implements INotificationRepository {

    public async findAllNotification(
        page: number,
        pageSize: number
    ): Promise<{ data: any[]; total: number } | null> {
        try {
            const [notifications, total] = await Promise.all([
                prisma.notification.findMany({
                    select: {
                        id: true,
                        date: true,
                        value: true,
                        read: true,
                        monitor: {
                            select: {
                                name: true,
                                alertDes: true,
                                alertlowerbound: true,
                                alertupperbound: true,
                                unit: true
                            }
                        }
                    },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                    orderBy: { date: "desc" }
                }),
                prisma.notification.count()
            ]);

            const list = notifications.map(e => {
                return new NotificationInfo(
                    e.id,
                    e.monitor.name,
                    e.monitor.alertDes,
                    e.monitor.alertlowerbound,
                    e.monitor.alertupperbound,
                    e.value,
                    e.date,
                    e.monitor.unit,
                    e.read
                );
            });

            return { data: list, total };
        } catch (error) {
            throw new Error("Can not get all notifications");
        }
    }


    public async saveNotification(value: number, feed: string): Promise<NotificationInfo | null> {
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

            return new NotificationInfo(
                data.id,
                monitoringSubject.name,
                monitoringSubject.alertDes,
                monitoringSubject.alertlowerbound,
                monitoringSubject.alertupperbound,
                value,
                data.date,
                monitoringSubject.unit,
                false
            )
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

            return !!updated
        }
        catch (error) {
            console.log(error)
            throw Error("Can not update status")
        }
    }

}