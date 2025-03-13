import { NextFunction, Request, Response } from "express"
import { LoadMonitorUseCase } from '../../domain/usecases/load-monitor'


export class MonitorController {
    constructor(private loadMonitorUseCase: LoadMonitorUseCase) { }

    public async getAllSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const listMonitor = await this.loadMonitorUseCase.loadAllSubject()
            return res.status(200).json({ status: true, data: listMonitor })
        }
        catch (error) {
            next(error)
        }
    }

    public async getAllSubjectName(req: Request, res: Response, next: NextFunction) {
        try {
            const listName = await this.loadMonitorUseCase.loadAllSubjectName()
            return res.status(200).json({ status: true, data: listName })
        }
        catch (error) {
            next(error)
        }
    }
}
