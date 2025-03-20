import mqtt from "mqtt";
import config from '../config/load-config';

// Singleton

class MqttClient {
  private static instance: mqtt.MqttClient | null = null;

  public static getInstance(): mqtt.MqttClient {
    if (!this.instance) {
      this.instance = mqtt.connect(config.AIO_URL || "", {
        username: config.AIO_USERNAME,
        password: config.AIO_KEY,
      });

      this.instance.on("connect", () => {
        console.log("Connected to Adafruit IO MQTT");
      });

      this.instance.on("error", (err) => {
        console.error("MQTT Error:", err);
      });
    }

    return this.instance;
  }
}

export default MqttClient;
