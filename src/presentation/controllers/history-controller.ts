import { NextFunction, Request, Response } from "express"
import { HandleHistoryUseCase } from "../../domain/usecases/handle-history"


export class HistoryDeviceController {

    constructor(private handleHistoryUseCase: HandleHistoryUseCase) { }

    public async getAllHistoryDevice(req: Request, res: Response, next: NextFunction) {
        try {
            const { page, pageSize, startDate, endDate, deviceName, typeAction } = req.query

            const pageNumber = page ? parseInt(page as string, 10) : 1
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 20
            const startDateObj = startDate ? new Date(startDate as string) : null
            const endDateObj = endDate ? new Date(endDate as string) : null
            const name = deviceName ? String(deviceName) : null
            const actionInfo = typeAction ? String(typeAction) : null

            let listMonitor = await this.handleHistoryUseCase.loadHistoryDevice(
                pageNumber,
                pageSizeNumber,
                startDateObj,
                endDateObj,
                name,
                actionInfo
            )

            return res.status(200).json({ status: true, totalOfRecord: listMonitor.total, data: listMonitor.data })
        }
        catch (error) {
            next(error)
        }
    }
}
