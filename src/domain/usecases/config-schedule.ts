import schedule from 'node-schedule';
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

    public startScheduler() {
        console.log("Scheduler started...");

        // Chạy mỗi phút để kiểm tra lịch trình
        schedule.scheduleJob("* * * * *", async () => {
            console.log("Checking scheduler configs...");
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // Lấy HH:MM
            const today = now.toLocaleDateString("en-US", { weekday: "short" }).toLowerCase(); // "mon", "tue", ...

            // Lấy tất cả cấu hình có SchedulerConfig
            const configs = await this.configRepository.findAllSchedulers()

            for (const config of configs) {
                const { id, start, end, configuration, repitation } = config;
                if (!configuration.action) continue ;
                if (!repitation || repitation.length === 0 || !repitation.includes(today)) {
                    continue;
                }
                const isStartTime = currentTime === start;
                const isEndTime = currentTime === end;
                
                const device = await this.deviceRepository.findDeviceBySubject(configuration.deviceId);
                if (device === null) continue;

                if (isStartTime && device.status === false) {
                    // Bật thiết bị
                    await this.deviceRepository.turnDevice(configuration.deviceId, true);
                    
                    const notification = new NotificationSchedule(
                      device.name ?? "Không xác định",
                      device.description ?? null,
                      config.configuration.description,
                      config.start,
                      config.end,
                      config.repitation.join(", ")
                    );
                  
                    CacheNotificationScheduler.getInstance().push(notification);
                    await this.mailService.SendEmailSchedule(notification, "kennezversion@gmail.com");
                    await this.historyRepository.createHistory(DeviceHistoryInfo.Scheduler, configuration.deviceId);
                    console.log(`Device ${configuration.deviceId} turned ON at ${start}`);
                }
                  
                if (isEndTime && device.status === true) {
                    // Tắt thiết bị
                    await this.deviceRepository.turnDevice(configuration.deviceId, false);
                    console.log(`Device ${configuration.deviceId} turned OFF at ${end}`);
                }                  
            }
        });
    }
}
