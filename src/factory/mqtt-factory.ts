import { MqttController } from "../presentation/controllers/mqtt-controller";
import { MqttUseCase } from "../domain/usecases/mqtt";
import { MqttRepository } from "../infrastructure/repositories/adafruit-mqtt-repository";

export function createMqttController() {
    const mqttRepository = new MqttRepository()
    const mqttUseCase = new MqttUseCase(mqttRepository)
    return new MqttController(mqttUseCase)
}