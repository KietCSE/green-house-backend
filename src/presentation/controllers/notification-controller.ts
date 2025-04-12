import { NextFunction, Request, Response } from "express";
import { NotifyUseCase } from "../../domain/usecases/notify";

export class NotificationController {

    constructor(private notifyUseCase: NotifyUseCase) { }

    public async getAllNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { pageSize, page } = req.query
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20
            const pageNumber = page ? parseInt(page as string, 10) : 1

            const notifications = await this.notifyUseCase.getAllNotification(pageNumber, pageSizeNumber)
            res.status(200).json({ status: true, data: notifications })
        } catch (error) {
            next(error)
        }
    }


    public async updateStatusNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { value } = req.body
            const { id } = req.params
            const val = value ? Boolean(value) : false
            const notificationId = id ? parseInt(id as string, 10) : -1;
            console.log(value, notificationId)
            const updated = await this.notifyUseCase.updateStatusNotification(val, notificationId)

            if (updated)
                res.status(200).json({ status: true, message: "Update notification status successfully" })
            else
                res.status(200).json({ status: false, message: "Update notification status fail" })
        }
        catch (error) {
            next(error)
        }
    }

    public async pollingNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const data = this.notifyUseCase.pollingNotification()
            if (data)
                res.status(200).json({ status: true, data })
            else
                res.status(200).json({ status: false, data })
        }
        catch (error) {
            next(error)
        }
    }

    public async pollingNotificationDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const data = this.notifyUseCase.pollingNotificationDevice()
            if (data)
                res.status(200).json({ status: true, data })
            else
                res.status(200).json({ status: false, data })
        }
        catch (error) {
            next(error)
        }
    }

    public async pollingNotificationSchedule(req: Request, res: Response, next: NextFunction) {
        try {
            const data = this.notifyUseCase.pollingNotificationScheduler()
            if (data)
                res.status(200).json({ status: true, data })
            else
                res.status(200).json({ status: false, data })
        }
        catch (error) {
            next(error)
        }
    }

}