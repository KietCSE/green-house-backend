import { NextFunction, Request, Response } from "express"
import { ConfigUseCase } from '../../domain/usecases/config'


export class ConfigController {
    constructor(private configUsecase: ConfigUseCase) { }

    public async findConfigBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const config = await this.configUsecase.findAllConfigsBySubject(req.params.subject)
            return res.status(200).json({ status: true, data: config })
        }
        catch (error) {
            next(error)
        }
    }

    public async createConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.createConfig(req, res)
        }
        catch (error) {
            next(error)
        }
    }
    
    public async createSchedulerConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.createSchedulerConfig(req, res)
        }
        catch (error) {
            next(error)
        }
    }
    
    public async createAutomationConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.createAutomationConfig(req, res)
        }
        catch (error) {
            next(error)
        }
    }

    public async createCondition(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.createCondition(req, res)
        }
        catch (error) {
            next(error)
        }
    }
}
