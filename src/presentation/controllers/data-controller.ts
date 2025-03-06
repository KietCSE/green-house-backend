import { NextFunction, Request, Response } from "express"
import { GetDataUseCase } from '../../domain/usecases/data'


export class DataController {
    constructor(private getDataUseCase: GetDataUseCase) { }

    public async getDataBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await this.getDataUseCase.getDataBySubject(req.params.subject)
            return res.status(200).json({ status: true, data: data })
        }
        catch (error) {
            next(error)
        }
    }
}
