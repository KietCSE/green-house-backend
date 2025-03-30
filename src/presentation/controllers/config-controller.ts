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

    public async updateConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.updateConfig(req, res);
        } catch (error) {
            next(error);
        }
    }

    public async deleteConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.deleteConfig(req, res);
        } catch (error) {
            next(error);
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

    public async updateSchedulerConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.updateSchedulerConfig(req, res);
        } catch (error) {
            next(error);
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

    public async updateCondition(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.updateCondition(req, res);
        } catch (error) {
            next(error);
        }
    }

    public async deleteCondition(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.deleteCondition(req, res);
        } catch (error) {
            next(error);
        }
    }

    public async turnConfig(req: Request, res: Response, next: NextFunction) {
        try {
            await this.configUsecase.turnConfig(req, res)
        }
        catch (error) {
            next(error)
        }
    }
}
