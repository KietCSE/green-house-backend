import MqttClient from "../../adafruit/mqtt-client";
import { IMqttRepository } from "../../domain/repositories/mqtt-repository";

export class MqttRepository implements IMqttRepository {
    private client = MqttClient.getInstance();

    public async publish(feed: string, message: string) {
        this.client.publish(feed, message, (err) => {
            if (err) {
                console.error("Publish Error:", err);
            } else {
                console.log(`Sent to ${feed}: ${message}`);
            }
        });
    }

    public async subscribe(feed: string, callback: (message: string) => void) {
        if (!feed) { // Kiểm tra nếu feed là undefined hoặc ""
            console.error("Subscription Error: Feed is missing or empty.");
            return;
        }

        this.client.subscribe(feed, (err) => {
            if (err) {
                console.error(`Subscription Error: ${feed}`, err);
            } else {
                console.log(`Subscribed to ${feed}`);
            }
        });

        this.client.on("message", (topic, message) => {
            console.log(`Received message from ${topic}: ${message.toString()}`);
            if (topic === feed) {
                callback(message.toString());  // handle data
            }
        });
    }
}