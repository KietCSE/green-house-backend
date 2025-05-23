import { NextFunction, Request, Response } from "express"
import { GetDataUseCase } from '../../domain/usecases/get-data'
import { nextTick } from "process"


export class DataController {

    constructor(private getDataUseCase: GetDataUseCase) { }

    public async getDataBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, pageSize, page, startDate, endDate } = req.query

            const Id = id ? parseInt(id as string, 10) : -1
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10
            const pageNumber = page ? parseInt(page as string, 10) : 1
            const startDateObj = startDate ? new Date(startDate as string) : null;
            const endDateObj = endDate ? new Date(endDate as string) : new Date();

            let data;

            if (startDateObj !== null) {
                data = await this.getDataUseCase.getDataByDateAndSubject(
                    Id,
                    pageSizeNumber,
                    pageNumber,
                    startDateObj,
                    endDateObj
                )
            }
            else data = await this.getDataUseCase.getDataByDateAndSubject(
                Id,
                pageSizeNumber,
                pageNumber
            )

            return res.status(200).json({ status: true, totalOfRecord: data?.total, data: data?.data })
        }
        catch (error) {
            next(error)
        }
    }

    public getCurrentData(req: Request, res: Response, next: NextFunction) {
        try {
            const data = this.getDataUseCase.getCurentData()
            return res.status(200).json({ status: true, data: data })
        }
        catch (error) {
            next(error)
        }
    }
}
