import { NextFunction, Request, Response } from "express"
import { DeviceUsecase } from '../../domain/usecases/device'


export class DeviceController {
    constructor(private deviceUsecase: DeviceUsecase) { }

    public async getDeviceBySubject(req: Request, res: Response, next: NextFunction) {
        try {
            const device = await this.deviceUsecase.getDeviceBySubject(req.params.subject)
            return res.status(200).json({ status: true, data: device })
        }
        catch (error) {
            next(error)
        }

    }
    public async getAllDevices(req: Request, res: Response, next: NextFunction) {
        try {
            const device = await this.deviceUsecase.getAllDevices()
            return res.status(200).json({ status: true, data: device })
        }
        catch (error) {
            next(error)
        }
    }

    public async createDevice(req: Request, res: Response, next: NextFunction) {
        try {
            await this.deviceUsecase.createDevice(req, res)
        }
        catch (error) {
            next(error)
        }
    }

    public async turnDevice(req: Request, res: Response, next: NextFunction) {
        try {
            await this.deviceUsecase.turnDevice(req, res)
        }
        catch (error) {
            next(error)
        }
    }
}
