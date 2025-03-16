import { NextFunction, Request, Response } from "express"
import { LoadMonitorUseCase } from '../../domain/usecases/load-monitor'
import { AlertUseCase } from '../../domain/usecases/alert'

export class MonitorController {
    constructor(
        private loadMonitorUseCase: LoadMonitorUseCase,
        private alertUseCase: AlertUseCase
    ) { }

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

    public async setAlertInformation(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject, alertDes, alertupperbound, alertlowerbound } = req.body
            await this.alertUseCase.setAlertInformation(subject, alertDes, alertupperbound, alertlowerbound)
            return res.status(200).json({ status: true, message: "Set alert information successfully" })
        }
        catch (error) {
            next(error)
        }
    }

    public async updateWarningStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject, status } = req.body
            await this.alertUseCase.updateAlertStatus(subject, status)
            return res.status(200).json({ status: true, message: "Update warning status successfully" })
        }
        catch (error) {
            next(error)
        }
    }
}
