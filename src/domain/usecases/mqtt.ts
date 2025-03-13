import { Request, Response } from "express";
import { MqttRepository } from "../../infrastructure/repositories/adafruit-mqtt-repository";
import config from '../../config/load-config';

export class MqttUseCase {
    constructor(private mqttRepository: MqttRepository) { }

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
        const { feed } = req.params;
        if (!feed) {
            return res.status(400).json({ success: false, error: "Missing feed" });
        }
        const feed_name = `${config.AIO_USERNAME}/feeds/${feed}`;

        this.mqttRepository.subscribe(feed_name, (message) => {
            console.log(`Received from ${feed}: ${message}`);
            res.status(200).json({
                success: true, 
                feed: feed,
                message: message 
            });
        });
    }
}