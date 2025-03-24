import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";
import { NotificationRepository } from "../../infrastructure/repositories/prisma-notification-repository";
import { IObserver } from "../repositories/observer";


export class AlertDataObserver implements IObserver {

    constructor(
        private monitorRepository: MonitorRepository,
        private notificationRepository: NotificationRepository
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        const isAlert = await this.monitorRepository.checkMonitor(feed, data)

        if (isAlert === true) {
            const alert = await this.notificationRepository.saveNotification(data, feed)

            // gui thong bao den trang nguoi dung 
            console.log(`Alert for ${feed} with ${data}`)
        }
    }
}

