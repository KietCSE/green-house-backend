import { MqttController } from "../presentation/controllers/mqtt-controller";
import { MqttUseCase } from "../domain/usecases/mqtt";
import { MqttRepository } from "../infrastructure/repositories/adafruit-mqtt-repository";
import { dataRepository } from "./data-factory";
import { notificationRepository } from "./notification-factory";
import { monitorRepository } from './monitor-factory'
import { AdafruitHandler } from "../domain/usecases/adafruit-handler";
import { PersistDataOberver } from "../domain/usecases/persist-data";
import { InsideMemRepository } from "../infrastructure/repositories/inside-mem-repository";
import { AlertDataObserver } from "../domain/usecases/alert";


export function createMqttController() {
    const mqttRepository = new MqttRepository()
    const adafruitHandler = new AdafruitHandler()

    //subcribe for adafruit handler

    const insideMemRepository = new InsideMemRepository()
    const persistDataOberver = new PersistDataOberver(dataRepository, insideMemRepository)

    const alertDataObserver = new AlertDataObserver(monitorRepository, notificationRepository)

    adafruitHandler.subscribe(persistDataOberver)
    adafruitHandler.subscribe(alertDataObserver)


    const mqttUseCase = new MqttUseCase(
        mqttRepository,
        adafruitHandler,
        dataRepository,
        monitorRepository,
        notificationRepository
    )

    mqttUseCase.listenAllFeed()
    return new MqttController(mqttUseCase)
}