import cron from "node-cron";
import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository"
import { DeviceRepository } from "../../infrastructure/repositories/prisma-device-repository"
import { HistoryRepository } from "../../infrastructure/repositories/prisma-history-repository"
import { DeviceHistoryInfo } from "@prisma/client";
import { NotificationSchedule } from "../../presentation/dtos/notification-device";
import { CacheNotificationScheduler } from "../../infrastructure/repositories/inside-notification-schedule-repository";
import { EmailService } from "../../infrastructure/services/gmail";

export class ConfigSchedulerUseCase {
    constructor(
        private configRepository: ConfigRepository,
        private deviceRepository: DeviceRepository,
        private historyRepository: HistoryRepository,
        private mailService: EmailService
    ) { }

    public async startScheduler() {
        console.log("Scheduler started...");

        // Chạy mỗi phút để kiểm tra lịch trình
        cron.schedule("*/5 * * * * *", async () => {
            console.log("Checking scheduler configs...");
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // Lấy HH:MM

            // Lấy tất cả cấu hình có SchedulerConfig
            const configs = await this.configRepository.findAllSchedulers()

            for (const config of configs) {
                const { id, start, end, configuration } = config;
                const isActive = currentTime >= start && currentTime <= end;
                
                const device = await this.deviceRepository.findDeviceBySubject(configuration.deviceId);

                // Nếu trạng thái khác với DB -> cập nhật
                if (isActive !== device?.status) {
                    if (!device?.status) {
                        const notification = new NotificationSchedule (
                            device?.name ?? "Không xác định",
                            device?.description ?? null,
                            config.configuration.description,
                            config.start,
                            config.end,
                            config.repitation
                        )

                        CacheNotificationScheduler.getInstance().push(notification)
                        await this.mailService.SendEmailSchedule(notification, "kennezversion@gmail.com");
                        await this.historyRepository.createHistory(DeviceHistoryInfo.Scheduler, configuration.deviceId)
                    }
                    await this.deviceRepository.turnDevice(configuration.deviceId, isActive);
                    console.log(`Updated device ${configuration.deviceId} to ${isActive ? "ON" : "OFF"}`);
                }
            }
        });
    }
}
