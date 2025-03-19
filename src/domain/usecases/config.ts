import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository"
import { Configuration, SchedulerConfig, AutomationConfig, Condition } from '@prisma/client'
import { Request, Response } from "express";

export class ConfigUseCase {

    constructor(private configRepository: ConfigRepository) { }

    public async findAllConfigsBySubject(subject: string): Promise<Configuration[] | null> {
        return this.configRepository.findAllConfigsBySubject(subject)
    }

    public async createConfig(req: Request, res: Response) {
        const { name, description, deviceId} = req.body

        const newConfig= await this.configRepository.createConfig(name, description, deviceId)
        return res.status(200).json({ status: true, message: "Config created successfully" })
    }

    public async createSchedulerConfig(req: Request, res: Response) {
        const { configId, start, end, repetition} = req.body
        const newSchedulerConfig =  await this.configRepository.createSchedulerConfig(configId, start, end, repetition)
        return res.status(200).json({ status: true, message: "Scheduler config created successfully" })
    }

    public async createAutomationConfig(req: Request, res: Response) {
        const { configId } = req.body
        const newAutomationConfig = await this.configRepository.createAutomationConfig(configId)
        return res.status(200).json({ status: true, message: "Automation config created successfully" })
    }

    public async createCondition(req: Request, res: Response) {
        const { condition, configId } = req.body
        const newCondition = await this.configRepository.createCondition(condition, configId)
        return res.status(200).json({ status: true, message: "Condition config created successfully" })
    }
}