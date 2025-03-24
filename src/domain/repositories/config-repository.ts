import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";

export interface IConfigRepository {
    findAllConfigsBySubject(subject: string): Promise<Configuration[] | null>;

    createConfig(name: string, description: string, deviceId: string): Promise<Configuration>
    createSchedulerConfig(configId: number, start: string, end: string, repetition?: string): Promise<SchedulerConfig>;

    createCondition(sensorId: string, condition: string, threshold: string, description: string, configId: number): Promise<Condition>;
    createAutomationConfig(configId: number): Promise<AutomationConfig>;

    turnConfig(subject: String, action: boolean): Promise<Configuration>
    findConditionBySensor(subject: string): Promise<Condition | null>
}
