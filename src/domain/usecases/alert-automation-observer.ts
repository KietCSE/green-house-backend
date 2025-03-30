import { IObserver } from "../repositories/observer";
import { HistoryRepository } from "../../infrastructure/repositories/prisma-history-repository";
import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository";
import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";
import { DeviceHistoryInfo } from "@prisma/client";

export class AlertAutomationObserver implements IObserver {

    constructor(
        private histotyRepository: HistoryRepository,
        private configRepository: ConfigRepository,
        private monitorRepository: MonitorRepository,
    ) { }

    public async execute(data: number, feed: string): Promise<void> {
        const sensor = await this.monitorRepository.findDataByFeed(feed);
        if (!sensor) {
            throw new Error(`No sensor found for feed: ${feed}`);
        }
    
        const condition = await this.configRepository.findConditionBySensor(sensor.name);
        if (!condition) {
            console.warn(`No condition found for sensor: ${sensor.name}`);
            return;
        }
    
        const threshold = parseFloat(condition.threshold);
        if (isNaN(threshold)) {
            throw new Error(`Invalid threshold value for sensor: ${sensor.name}`);
        }
    
        // Định nghĩa danh sách toán tử và cách kiểm tra điều kiện
        const operators: Record<string, (a: number, b: number) => boolean> = {
            ">": (a, b) => a > b,
            "<": (a, b) => a < b,
            ">=": (a, b) => a >= b,
            "<=": (a, b) => a <= b,
            "!=": (a, b) => a != b,
            "==": (a, b) => a === b,
        };
    
        if (condition.condition in operators && operators[condition.condition](data, threshold)) {
            console.log(`Alert: ${sensor.name} ${condition.condition} ${condition.threshold}`);

            const config = await this.configRepository.turnConfig(condition.automationConfigId.toString(), true);
            await this.histotyRepository.createHistory(DeviceHistoryInfo.Auto, config.deviceId);
        } else {
            console.log(`Sensor ${sensor.name} is within normal range.`);
        }
    }
    
}

