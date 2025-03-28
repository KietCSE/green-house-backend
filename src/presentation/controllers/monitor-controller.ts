import { NextFunction, Request, Response } from "express"
import { LoadMonitorUseCase } from '../../domain/usecases/handle-monitor'
import { AlertUseCase } from '../../domain/usecases/create-alert'

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
            const { alertDes, alertupperbound, alertlowerbound, status, email } = req.body
            const id: number = Number(req.params.id)

            await this.alertUseCase.setAlertInformation(id, alertDes, alertupperbound, alertlowerbound, status, email)
            return res.status(200).json({ status: true, message: "Set alert information successfully" })
        }
        catch (error) {
            next(error)
        }
    }

    public async updateWarningStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { feed, status } = req.body
            await this.alertUseCase.updateAlertStatus(feed, status)
            return res.status(200).json({ status: true, message: "Update warning status successfully" })
        }
        catch (error) {
            next(error)
        }
    }

    public async addMonitorSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, unit, upperbound, lowerbound, feed } = req.body
            await this.loadMonitorUseCase.addMonitorSubject(name, description, unit, upperbound, lowerbound, feed)
            return res.status(200).json({ status: true, message: "Create monitor subject successfully" })
        }
        catch (error) {
            next(error)
        }
    }

    public async updateMonitorSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, description, unit, upperbound, lowerbound } = req.body

            const id: number = Number(req.params.id);

            await this.loadMonitorUseCase.updateMonitorSubject(name, description, unit, upperbound, lowerbound, id)
            return res.status(200).json({ status: true, message: "Update monitor subject successfully" })
        }
        catch (error) {
            next(error)
        }
    }

    public async deleteMonitorSubject(req: Request, res: Response, next: NextFunction) {
        try {
            const id: number = Number(req.params.id)
            await this.loadMonitorUseCase.deleteMonitorSubject(id)
            return res.status(200).json({ status: true, message: "Delete monitor subject successfully" })
        }
        catch (error) {
            next(error)
        }
    }
}
