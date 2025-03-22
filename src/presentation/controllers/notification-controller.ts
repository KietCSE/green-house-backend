import { NextFunction, Request, Response } from "express";
import { NotifyUseCase } from "../../domain/usecases/notify";

export class NotificationController {

    constructor(private notifyUseCase: NotifyUseCase) { }

    public async getAllNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { pageSize, page } = req.query
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10
            const pageNumber = page ? parseInt(page as string, 10) : 1

            const notifications = await this.notifyUseCase.getAllNotification(pageNumber, pageSizeNumber)
            res.status(200).json({ status: true, data: notifications })
        } catch (error) {
            next(error)
        }
    }
}