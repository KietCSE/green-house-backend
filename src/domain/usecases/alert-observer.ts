import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";
import { NotificationRepository } from "../../infrastructure/repositories/prisma-notification-repository";
import { EmailService } from "../../infrastructure/services/gmail";
import { IObserver } from "../repositories/observer";


export class AlertDataObserver implements IObserver {

    constructor(
        private monitorRepository: MonitorRepository,
        private notificationRepository: NotificationRepository,
        private mailService: EmailService
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        const isAlert = await this.monitorRepository.checkMonitor(feed, data)

        if (isAlert === true) {

            const alert = await this.notificationRepository.saveNotification(data, feed)

            // if (alert) this.mailService.SendEmail(alert, "ptkiet170104@gmail.com")

            // gui thong bao den trang nguoi dung 
            console.log(`Alert for ${feed} with ${data}`)
        }
    }
}

