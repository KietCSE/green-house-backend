import { NextFunction, Request, Response } from "express";
import { NotifyUseCase } from "../../domain/usecases/notify";

export class NotificationController {

    constructor(private notifyUseCase: NotifyUseCase) { }

    public async getAllNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const notifications = await this.notifyUseCase.getAllNotification()
            res.status(200).json({ status: true, data: notifications })
        } catch (error) {
            next(error)
        }
    }
}