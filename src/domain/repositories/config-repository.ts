import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";

export interface IConfigRepository {
    findConfigBySubject(subject: string): Promise<Configuration | null>;

    createConfig(name: string, description: string, deviceId: string): Promise<Configuration>
    createSchedulerConfig(configId: number, start: string, end: string, repetition?: string): Promise<SchedulerConfig>;

    createCondition(condition: string, configId: number): Promise<Condition>;
    createAutomationConfig(configId: number): Promise<AutomationConfig>;
}
