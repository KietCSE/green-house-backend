import { Notification } from "@prisma/client";
import { MonitoringSubject } from "@prisma/client";

export class NotificationData {
    notification: Notification;
    monitoringSubject: MonitoringSubject;

    constructor(notification: Notification, monitoringSubject: any) {
        this.notification = notification;
        this.monitoringSubject = monitoringSubject;
    }
}
