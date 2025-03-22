import { Request, Response } from "express";
import { MqttRepository } from "../../infrastructure/repositories/adafruit-mqtt-repository";
import config from '../../config/load-config';
import { Socket } from "socket.io";
import { SocketManager } from "../../adafruit/socket";
import { Data } from "@prisma/client";
import { DataRepository } from "../../infrastructure/repositories/prisma-data-repository";
import { IDataRepository } from "../../domain/repositories/data-repository"
import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { INotificationRepository } from "../../domain/repositories/notification-repository"
import { AdafruitHandler } from "./adafruit-handler";


export class MqttUseCase {

    constructor(
        private mqttRepository: MqttRepository,
        // private adafruitHandler: AdafruitHandler,
        private dataRepository: IDataRepository,
        private monitorRepository: IMonitorRepository,
        private notificationRepository: INotificationRepository
    ) { }

    public async sendMessage(req: Request, res: Response) {
        const { feed, message } = req.body;
        if (!feed || !message) {
            return res.status(400).json({ success: false, error: "Missing feed or message" });
        }

        const feed_name = `${config.AIO_USERNAME}/feeds/${feed}`;
        this.mqttRepository.publish(feed_name, message);
        res.status(200).json({
            status: true,
            data: {
                feed,
                message
            }
        });
    }

    public async listenFeed(req: Request, res: Response) {
        try {
            const { feed } = req.params;
            if (!feed) {
                return res.status(400).json({ success: false, error: "Missing feed" });
            }

            const feed_name = `${config.AIO_USERNAME}/feeds/${feed}`;

            this.mqttRepository.subscribe(feed_name, async (message) => {
                console.log(message)
                const data = Number(message)
                // this.adafruitHandler.notify(data, feed_name)
            });

            res.status(200).json({ status: true, message: "Subscribe successfully" })
        }
        catch (error) {
            res.status(400).json({ status: false, message: "Error when subscribe adafruit" })
        }
    }


}