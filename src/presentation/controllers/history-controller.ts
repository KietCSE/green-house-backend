import { NextFunction, Request, Response } from "express"
import { HandleHistoryUseCase } from "../../domain/usecases/handle-history"


export class HistoryDeviceController {

    constructor(private handleHistoryUseCase: HandleHistoryUseCase) { }

    public async getAllHistoryDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, pageSize, startDate, endDate } = req.query

            const pageNumber = page ? parseInt(page as string, 10) : 1
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10
            const startDateObj = startDate ? new Date(startDate as string) : null;
            const endDateObj = endDate ? new Date(endDate as string) : new Date();

            let listMonitor

            if (startDateObj !== null) {
                listMonitor = await this.handleHistoryUseCase.loadHistoryDevice(pageNumber, pageSizeNumber, startDateObj, endDateObj)
            }
            else listMonitor = await this.handleHistoryUseCase.loadHistoryDevice(pageNumber, pageSizeNumber)

            return res.status(200).json({ status: true, totalOfRecord: listMonitor.total, data: listMonitor.data })
        }
        catch (error) {
            next(error)
        }
    }
}
