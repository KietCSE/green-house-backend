import { NextFunction, Request, Response } from "express"
import { GetDataUseCase } from '../../domain/usecases/data'


export class DataController {
    constructor(private getDataUseCase: GetDataUseCase) { }

    public async getDataBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const { subject, pageSize, page } = req.query

            const subjectName = subject ? subject as string : ''
            const pageSizeNumber = pageSize ? parseInt(pageSize as string, 10) : 10
            const pageNumber = page ? parseInt(page as string, 10) : 1

            console.log(subjectName, pageSizeNumber, pageNumber)

            const data = await this.getDataUseCase.getDataBySubject(subjectName, pageSizeNumber, pageNumber)
            return res.status(200).json({ status: true, data: data })
        }
        catch (error) {
            next(error)
        }
    }
}
