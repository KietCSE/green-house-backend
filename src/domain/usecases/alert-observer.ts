import { CacheNotification } from "../../infrastructure/repositories/inside-notification-repository";
import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";
import { NotificationRepository } from "../../infrastructure/repositories/prisma-notification-repository";
import { EmailService } from "../../infrastructure/services/gmail";
import { IObserver } from "../repositories/observer";

export class AlertDataObserver implements IObserver {
    // Map to store the last email sent time for each feed:type combination
    private lastEmailSent: Map<string, number> = new Map();
    // 10-minute cooldown in milliseconds
    private readonly EMAIL_COOLDOWN = 10 * 60 * 1000;

    constructor(
        private monitorRepository: MonitorRepository,
        private notificationRepository: NotificationRepository,
        private mailService: EmailService
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        const { isAlert, type } = await this.monitorRepository.checkMonitor(feed, data);

        if (isAlert === true && type) {
            const alert = await this.notificationRepository.saveNotification(data, feed);

            if (alert) {
                CacheNotification.getInstance().push(alert);

                // Create a composite key for feed and type
                const compositeKey = `${feed}:${type}`;
                const lastSent = this.lastEmailSent.get(compositeKey);
                const currentTime = Date.now();

                // Only send email if no email was sent for this feed:type in the last 10 minutes
                if (!lastSent || currentTime - lastSent >= this.EMAIL_COOLDOWN) {
                    this.mailService.SendEmailToAllUser(alert);
                    this.lastEmailSent.set(compositeKey, currentTime);
                }

                console.log(`Alert for ${feed} with ${data}${type ? ` (type: ${type})` : ''}`);
            }
        }
    }
}