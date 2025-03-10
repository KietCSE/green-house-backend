import { IConfigRepository } from "../../domain/repositories/config-repository"
import { Configuration, SchedulerConfig, AutomationConfig, Condition } from "@prisma/client";
import prisma from '../../config/prisma-config'
import { connect } from "http2";

export class ConfigRepository implements IConfigRepository {
    public async findConfigBySubject(subject: string): Promise<Configuration | null> {
        const config = await prisma.configuration.findFirst({ 
            where: { 
                deviceId : subject 
            },
            include: {
                device: false
            }
        })
        return config
    }

    public async createConfig(name: string, description: string, deviceId: string): Promise<Configuration> {
        const action = false
        const newConfig = await prisma.configuration.create({
            data: {name, description, action, deviceId}
        })
        return newConfig
    }

    public async createSchedulerConfig(configId: number, start: string, end: string, repetition?: string): Promise<SchedulerConfig> {
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

    public async createAutomationConfig(configId: number): Promise<AutomationConfig> {
        const newAutomationConfig = await prisma.automationConfig.create({
            data: {
                configuration: { connect: { id: configId } }
            }
        })
        return newAutomationConfig
    }

    public async createCondition(condition: string, configId: number): Promise<Condition> {
        const newCondition = await prisma.condition.create({
            data: {
                condition,
                automation: { connect: { id: configId} }
            }
        })

        return newCondition;
    }
}