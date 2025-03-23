import { Request, Response } from "express";
import config from '../../config/load-config';
import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { AdafruitHandler } from "./adafruit-handler";
import { IMqttRepository } from "../repositories/mqtt-repository";
import axios from "axios";

export class MqttUseCase {

    private subsribeFeeds = new Set<string>

    constructor(
        private mqttRepository: IMqttRepository,
        private adafruitHandler: AdafruitHandler,
        private monitorRepository: IMonitorRepository,
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

    public async subscribeToFeed(feed: string) {
        try {
            if (this.subsribeFeeds.has(feed)) {
                console.log("Already subcribe to ", feed)
                return
            }

            const validFeed = await this.checkFeedExists(feed)
            if (!validFeed) {
                console.log(`This feed already existed in adafruit ${feed}`)
                return
            }

            const feed_name = `${config.AIO_USERNAME}/feeds/${feed}`;

            this.mqttRepository.subscribe(feed_name, async (message) => {
                console.log(message)
                const data = Number(message)
                this.adafruitHandler.notify(data, feed)
            });

            this.subsribeFeeds.add(feed)
            console.log('Successfull to listen ', feed)
        }
        catch (error) {
            console.error(`Error subscribing to feed ${feed}:`, error);
            throw new Error(`Error when subscribe feed ${feed}`)
        }
    }

    public async listenAllFeed(): Promise<void> {
        try {
            const listMonnitoringSubject = await this.monitorRepository.loadAllFeedName()

            console.log("start listening feeds")

            for (let feed of listMonnitoringSubject) {
                await this.subscribeToFeed(feed)
            }
        }
        catch (error) {
            console.log(error)
            throw new Error("Error when subscribe feeds")
        }
    }

}