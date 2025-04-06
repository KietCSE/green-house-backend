import cron from "node-cron";
import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository"
import { DeviceRepository } from "../../infrastructure/repositories/prisma-device-repository"

export class ConfigSchedulerUseCase {
    constructor(
        private configRepository: ConfigRepository,
        private deviceReposttory: DeviceRepository
    ) { }

    public async startScheduler() {
        console.log("Scheduler started...");

        // Chạy mỗi phút để kiểm tra lịch trình
        cron.schedule("* * * * *", async () => {
            console.log("Checking scheduler configs...");
            const now = new Date();
            const currentTime = now.toTimeString().slice(0, 5); // Lấy HH:MM

            // Lấy tất cả cấu hình có SchedulerConfig
            const configs = await this.configRepository.findAllSchedulers()

            for (const config of configs) {
                const { id, start, end, configuration } = config;
                const isActive = currentTime >= start && currentTime <= end;
                
                const device = await this.deviceReposttory.findDeviceBySubject(configuration.deviceId);

                // Nếu trạng thái khác với DB -> cập nhật
                if (isActive != device?.status) {
                    await this.deviceReposttory.turnDevice(configuration.deviceId, isActive);
                    console.log(`Updated config ${id} to ${isActive ? "ON" : "OFF"}`);
                }
            }
        });
    }
}
