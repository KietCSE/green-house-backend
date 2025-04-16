import { ConditionWithAuto, IConfigRepository, SchedulerWithConfig } from "../../domain/repositories/config-repository"
import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";
import prisma from '../../config/prisma-config'
import { DeviceRepository } from "./prisma-device-repository";

export class ConfigRepository implements IConfigRepository {
    private deviceRepository = new DeviceRepository()
    public async findConditionBySensor(subject: string): Promise<ConditionWithAuto[] | null> {
        return await prisma.condition.findMany({
            where: {
                sensorId: subject
            },
            include: {  automation: {
                include: {
                    configuration: true
                }
            } }
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
                deviceId: parseInt(subject, 10)
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

    public async createConfig(name: string, description: string, deviceId: string, changePower: number): Promise<Configuration> {
        const action = false

        const device = await this.deviceRepository.findDeviceBySubject(deviceId)

        if (!device) throw new Error(`Device with ID ${deviceId} does not exist.`);

        var defaultPower = device.power;
        if (!device.status) defaultPower = 0;

        const newConfig = await prisma.configuration.create({
            data: { name, description, action, deviceId: parseInt(deviceId, 10), defaultPower, changePower}
        })
        return newConfig
    }

    public async updateConfig(configId: number, name?: string, description?: string, changePower?: number, defaultPower?: number): Promise<Configuration> {
        const updatedConfig = await prisma.configuration.update({
            where: { id: configId },
            data: {
                name: name,
                description: description,
                changePower: changePower,
                defaultPower
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

    public async createSchedulerConfig(configId: number, start: string, end: string, repetition: string[]): Promise<SchedulerConfig> {
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
                repitation: repetition,
            }
        })
        return newSchedulerConfig
    }

    public async updateSchedulerConfig(configId: number, start?: string, end?: string, repetition?: string[]): Promise<SchedulerConfig> {
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

        return updatedConfig
    }
}