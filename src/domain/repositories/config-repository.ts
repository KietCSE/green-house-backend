import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";
export type SchedulerWithConfig = SchedulerConfig & { configuration: Configuration };
export type ConditionWithAuto = Condition & { automation: AutoWithConfig };
export type AutoWithConfig = AutomationConfig & { configuration: Configuration };

export interface IConfigRepository {
    findAllConfigsBySubject(subject: string): Promise<Configuration[] | null>;
    findAllSchedulers(): Promise<SchedulerWithConfig[]>

    createConfig(name: string, description: string, deviceId: string, changePower: number): Promise<Configuration>
    updateConfig(configId: number, name?: string, description?: string, changePower?: number, defaultPower?: number): Promise<Configuration>;
    deleteConfig(configId: number): Promise<Configuration>;
    turnConfig(subject: String, action: boolean): Promise<Configuration>

    createSchedulerConfig(configId: number, start: string, end: string, repetition: string[]): Promise<SchedulerConfig>;
    updateSchedulerConfig(configId: number, start?: string, end?: string, repetition?: string[]): Promise<SchedulerConfig>;

    createAutomationConfig(configId: number): Promise<AutomationConfig>;

    findConditionBySensor(subject: string): Promise<ConditionWithAuto[] | null>
    createCondition(sensorId: string, condition: string, threshold: string, description: string, configId: number): Promise<Condition>;
    updateCondition(conditionId: number, sensorId?: string, condition?: string, threshold?: string, description?: string): Promise<Condition>;
    deleteCondition(conditionId: number): Promise<Condition>;
}
