import { ConfigRepository } from "../../infrastructure/repositories/prisma-config-repository"
import { Configuration, SchedulerConfig, AutomationConfig, Condition } from '@prisma/client'
import { Request, Response } from "express";

export class ConfigUseCase {

    constructor(private configRepository: ConfigRepository) { }

    public async findAllConfigsBySubject(subject: string): Promise<Configuration[] | null> {
        return this.configRepository.findAllConfigsBySubject(subject)
    }

    public async createConfig(req: Request, res: Response) {
        const { name, description, deviceId, changePower} = req.body

        const newConfig= await this.configRepository.createConfig(name, description, deviceId, changePower)
        return res.status(200).json({ status: true, message: "Config created successfully" , data: newConfig})
    }

    public async updateConfig(req: Request, res: Response) {
        const { subject } = req.params;
        const { name, description, changePower } = req.body;
        const updatedConfig = await this.configRepository.updateConfig(Number(subject), name, description, changePower);
        return res.status(200).json({ status: true, message: "Config updated successfully", data: updatedConfig });
    }

    public async deleteConfig(req: Request, res: Response) {
        const { subject } = req.params;
        const deletedConfig = await this.configRepository.deleteConfig(Number(subject));
        return res.status(200).json({ status: true, message: "Config deleted successfully", data: deletedConfig });
    }

    public async createSchedulerConfig(req: Request, res: Response) {
        const { configId, start, end, repetition} = req.body
        const newSchedulerConfig =  await this.configRepository.createSchedulerConfig(configId, start, end, repetition)
        return res.status(200).json({ status: true, message: "Scheduler config created successfully" , data: newSchedulerConfig})
    }

    public async updateSchedulerConfig(req: Request, res: Response) {
        const { subject } = req.params;
        const { start, end, repetition } = req.body;
        const updatedSchedulerConfig = await this.configRepository.updateSchedulerConfig(Number(subject), start, end, repetition);
        return res.status(200).json({ status: true, message: "Scheduler config updated successfully", data: updatedSchedulerConfig });
    }

    public async createAutomationConfig(req: Request, res: Response) {
        const { configId } = req.body
        const newAutomationConfig = await this.configRepository.createAutomationConfig(configId)
        return res.status(200).json({ status: true, message: "Automation config created successfully" , data: newAutomationConfig})
    }

    public async createCondition(req: Request, res: Response) {
        const { sensorId, condition, threshold, description, configId } = req.body
        const newCondition = await this.configRepository.createCondition(sensorId, condition, threshold, description, configId)
        return res.status(200).json({ status: true, message: "Condition config created successfully" , data: newCondition})
    }

    public async updateCondition(req: Request, res: Response) {
        const { subject } = req.params;
        const { sensorId, condition, threshold, description } = req.body;
        const updatedCondition = await this.configRepository.updateCondition(Number(subject), sensorId, condition, threshold, description);
        return res.status(200).json({ status: true, message: "Condition updated successfully", data: updatedCondition });
    }

    public async deleteCondition(req: Request, res: Response) {
        const { subject } = req.params;
        const deletedCondition = await this.configRepository.deleteCondition(Number(subject));
        return res.status(200).json({ status: true, message: "Condition deleted successfully", data: deletedCondition });
    }

    public async turnConfig(req: Request, res: Response) {
        const { subject } = req.params;
        const { action } = req.body; 

        const turnConfig = await this.configRepository.turnConfig(subject, action)
        return res.status(200).json({ status: true, message: "Config updated successfully", data: turnConfig})
    }
 }