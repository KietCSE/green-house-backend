import { IObserver } from "../repositories/observer";
import { HistoryRepository } from "../../infrastructure/repositories/prisma-history-repository";
import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository";
import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";
import { DeviceRepository } from "../../infrastructure/repositories/prisma-device-repository";
import { DeviceHistoryInfo } from "@prisma/client";
import { EmailService } from "../../infrastructure/services/gmail";
import { NotificationDevice } from "../../presentation/dtos/notification-device";
import { CacheNotificationDevice } from "../../infrastructure/repositories/inside-notification-device-repository";
import { ConfigSchedulerUseCase } from "./config-schedule";

export class AlertAutomationObserver implements IObserver {

    constructor(
        private histotyRepository: HistoryRepository,
        private configRepository: ConfigRepository,
        private monitorRepository: MonitorRepository,
        private deviceRepository: DeviceRepository,
        private mailService: EmailService, 
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        const sensors = await this.monitorRepository.findDataByFeed(feed);
        if (!sensors || sensors.length === 0) {
            throw new Error(`No sensor found for feed: ${feed}`);
        }
    
        for (const sensor of sensors) {
            const conditions = await this.configRepository.findConditionBySensor(sensor.name);
            if (!conditions || conditions.length === 0) {
                console.warn(`No condition found for sensor: ${sensor.name}`);
                continue;
            }
    
            for (const condition of conditions) {
                const threshold = parseFloat(condition.threshold);
                if (isNaN(threshold)) {
                    console.warn(`Invalid threshold value for sensor: ${sensor.name}`);
                    continue;
                }
    
                const operators: Record<string, (a: number, b: number) => boolean> = {
                    ">": (a, b) => a > b,
                    "<": (a, b) => a < b,
                    ">=": (a, b) => a >= b,
                    "<=": (a, b) => a <= b,
                    "!=": (a, b) => a != b,
                    "==": (a, b) => a === b,
                };
    
                const operatorFn = operators[condition.condition];
                if (operatorFn && operatorFn(data, threshold)) {
                    console.log(`Alert: ${sensor.name} ${condition.condition} ${condition.threshold}`);
                    
                    const config = condition.automation.configuration

                    if (!config.action) continue;

                    const device = await this.deviceRepository.findDeviceBySubject(config.deviceId);
                    if (!device) {
                        console.error(`Device not found for ID: ${config.deviceId}`);
                        return;
                    }
                    const notification = new NotificationDevice (
                        device.name,
                        device.description,
                        config.description,
                        condition.description,
                        condition.condition,
                        condition.threshold,
                        data,
                    )
                    
                    CacheNotificationDevice.getInstance().push(notification)
                    await this.mailService.SendEmailConfig(notification, "kennezversion@gmail.com");
                    await this.histotyRepository.createHistory(DeviceHistoryInfo.Auto, config.deviceId);
                    await this.deviceRepository.turnDevice(config.deviceId, true);
                } else {
                    console.log(`Sensor ${sensor.name} is within normal range for condition: ${condition.condition} ${condition.threshold}`);
                }
            }
        }
    }
}

