import { IConfigRepository, SchedulerWithConfig } from "../../domain/repositories/config-repository"
import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";
import prisma from '../../config/prisma-config'

export class ConfigRepository implements IConfigRepository {
    public async findConditionBySensor(subject: string): Promise<Condition[] | null> {
        return await prisma.condition.findMany({
            where: {
                sensorId: subject
            }
        });
    }

    public async findAllSchedulers(): Promise<SchedulerWithConfig[]> {
        return await prisma.schedulerConfig.findMany({
            include: { configuration: true }
        });
    }

    public async findAllConfigsBySubject(subject: string): Promise<Configuration[] | null> {
        const config = await prisma.configuration.findMany({
            where: {
                deviceId: subject
            },
            include: {
                device: false,
                schedulerConfig: true,
                automationConfig: {
                    include: {
                        Condition: true
                    }
                }
            }
        })
        return config
    }

    public async createConfig(name: string, description: string, deviceId: string): Promise<Configuration> {
        const action = false
        const newConfig = await prisma.configuration.create({
            data: { name, description, action, deviceId }
        })
        return newConfig
    }

    public async updateConfig(configId: number, name?: string, description?: string): Promise<Configuration> {
        const updatedConfig = await prisma.configuration.update({
            where: { id: configId },
            data: {
                name: name,
                description: description
            }
        })
        return updatedConfig
    }

    public async deleteConfig(configId: number): Promise<Configuration> {
        const deletedConfig = await prisma.configuration.delete({
            where: { id: configId }
        })
        return deletedConfig
    }

    public async createSchedulerConfig(configId: number, start: string, end: string, repetition?: string): Promise<SchedulerConfig> {
        const existingConfig = await prisma.configuration.findUnique({
            where: { id: configId },
            include: { schedulerConfig: true, automationConfig: true }
        });

        if (!existingConfig) {
            throw new Error(`Configuration with ID ${configId} does not exist.`);
        }

        if (existingConfig.schedulerConfig || existingConfig.automationConfig) {
            throw new Error(`Configuration with ID ${configId} already has a config. Cannot create another one.`);
        }

        const newSchedulerConfig = await prisma.schedulerConfig.create({
            data: {
                configuration: { connect: { id: configId } },
                start,
                end,
                repitation: repetition ?? null,
            }
        })
        return newSchedulerConfig
    }

    public async updateSchedulerConfig(configId: number, start?: string, end?: string, repetition?: string): Promise<SchedulerConfig> {
        const updatedConfig = await prisma.schedulerConfig.update({
            where: { id: configId },
            data: {
                start, end, repitation: repetition
            }
        })
        return updatedConfig
    }

    public async createAutomationConfig(configId: number): Promise<AutomationConfig> {
        const existingConfig = await prisma.configuration.findUnique({
            where: { id: configId },
            include: { schedulerConfig: true, automationConfig: true }
        });

        if (!existingConfig) {
            throw new Error(`Configuration with ID ${configId} does not exist.`);
        }

        if (existingConfig.schedulerConfig || existingConfig.automationConfig) {
            throw new Error(`Configuration with ID ${configId} already has a config. Cannot create another one.`);
        }

        const newAutomationConfig = await prisma.automationConfig.create({
            data: {
                configuration: { connect: { id: configId } }
            }
        })
        return newAutomationConfig
    }

    public async createCondition(sensorId: string, condition: string, threshold: string, description: string, configId: number): Promise<Condition> {
        const newCondition = await prisma.condition.create({
            data: {
                sensorId,
                condition,
                threshold,
                description,
                automation: { connect: { id: configId } }
            }
        })

        return newCondition;
    }

    public async updateCondition(conditionId: number, sensorId?: string, condition?: string, threshold?: string, description?: string): Promise<Condition> {
        const updatedCondition = await prisma.condition.update({
            where: { id: conditionId },
            data: {
                sensorId, condition, threshold, description
            }
        })
        return updatedCondition
    }

    public async deleteCondition(conditionId: number): Promise<Condition> {
        const deletedCondition = await prisma.condition.delete({
            where: { id: conditionId }
        })
        return deletedCondition
    }

    public async turnConfig(subject: string, action: boolean): Promise<Configuration> {
        const configId = parseInt(subject, 10);
        const updatedConfig = await prisma.configuration.update({
            where: { id: configId },
            data: { action }
        })

        if (action) {

        }

        return updatedConfig
    }
}