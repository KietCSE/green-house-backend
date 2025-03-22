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
import axios from "axios";
import { PersistDataOberver } from "./persist-data";

export class MqttUseCase {

    constructor(
        private mqttRepository: MqttRepository,
        private adafruitHandler: AdafruitHandler,
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

    private async checkFeedExists(feed: string): Promise<boolean> {
        const url = `https://io.adafruit.com/api/v2/${config.AIO_USERNAME}/feeds/${feed}`;

        try {
            const response = await axios.get(url, {
                headers: { "X-AIO-Key": config.AIO_KEY }, // API Key của Adafruit IO
            });
            return response.status === 200;
        } catch (error) {
            console.error(`Feed ${feed} không tồn tại hoặc không truy cập được.`);
            return false;
        }
    }


    public async listenAllFeed() {
        try {
            const listMonnitoringSubject = await this.monitorRepository.loadAllFeedName()

            console.log("start listening feeds")

            for (let feed of listMonnitoringSubject) {
                const validFeed = await this.checkFeedExists(feed)
                if (!validFeed) {
                    console.log(`Invalid feed ${feed}`)
                    continue
                }

                const feed_name = `${config.AIO_USERNAME}/feeds/${feed}`;

                this.mqttRepository.subscribe(feed_name, async (message) => {
                    console.log(message)
                    const data = Number(message)
                    this.adafruitHandler.notify(data, feed)
                });
            }
        }
        catch(error) {
            throw new Error("Error when subscribe feeds")
        }
    }

}