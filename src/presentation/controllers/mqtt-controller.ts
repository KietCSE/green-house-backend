import { NextFunction, Request, Response } from "express";
import { MqttUseCase } from "../../domain/usecases/mqtt"; "../../domain/usecases/mqtt";

export class MqttController {
    constructor(private mqttUsecase: MqttUseCase) { }

    public async sendMessage(req: Request, res: Response, next: NextFunction) {
        try {
            await this.mqttUsecase.sendMessage(req, res)
        }
        catch (error) {
            next(error)
        }
    }

    public async listenFeed(req: Request, res: Response, next: NextFunction) {
        try {
            await this.mqttUsecase.listenFeed(req, res)
        }
        catch (error) {
            next(error)
        }
    }
}

