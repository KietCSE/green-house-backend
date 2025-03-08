import { NextFunction, Request, Response } from "express"
import { HandleHistoryUseCase } from "../../domain/usecases/handle-history"


export class HistoryDeviceController {
    constructor(private handleHistoryUseCase: HandleHistoryUseCase) { }

    public async getAllHistoryDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, pageSize } = req.query

            const pageNumber = page ? parseInt(page as string, 10) : 1
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10

            const listMonitor = await this.handleHistoryUseCase.loadHistoryDevice(pageNumber, pageSizeNumber)
            return res.status(200).json({ status: true, data: listMonitor })
        }
        catch (error) {
            next(error)
        }
    }
}
