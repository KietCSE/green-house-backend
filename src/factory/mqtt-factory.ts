import { MqttController } from "../presentation/controllers/mqtt-controller";
import { MqttUseCase } from "../domain/usecases/mqtt";
import { MqttRepository } from "../infrastructure/repositories/adafruit-mqtt-repository";
import { dataRepository } from "./data-factory";
import { notificationRepository } from "./notification-factory";
import { monitorRepository } from './monitor-factory'


export function createMqttController() {
    const mqttRepository = new MqttRepository()
    const mqttUseCase = new MqttUseCase(mqttRepository, dataRepository, monitorRepository, notificationRepository)
    return new MqttController(mqttUseCase)
}