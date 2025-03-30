import { MqttController } from "../presentation/controllers/mqtt-controller";
import { MqttUseCase } from "../domain/usecases/mqtt";
import { MqttRepository } from "../infrastructure/repositories/adafruit-mqtt-repository";
import { dataRepository } from "./data-factory";
import { notificationRepository } from "./notification-factory";
import { AdafruitHandler } from "../domain/usecases/adafruit-handler";
import { PersistDataOberver } from "../domain/usecases/persist-data-observer";
// import { InsideMemRepository } from "../infrastructure/repositories/inside-mem-repository";
import { AlertDataObserver } from "../domain/usecases/alert-observer";
import { MonitorRepository } from "../infrastructure/repositories/prisma-monitor-repository";
import { EmailService } from "../infrastructure/services/gmail";
import { AlertAutomationObserver } from "../domain/usecases/alert-automation-observer";
import { HistoryRepository } from "../infrastructure/repositories/prisma-history-repository";
import { ConfigRepository } from "../infrastructure/repositories/prisma-config-repository";


const mqttRepository = new MqttRepository()
const adafruitHandler = new AdafruitHandler()

//subcribe for adafruit handler

const monitorRepository = new MonitorRepository()
// const insideMemRepository = InsideMemRepository.getInstance()
const persistDataOberver = new PersistDataOberver(dataRepository)

const emailService = new EmailService
const alertDataObserver = new AlertDataObserver(monitorRepository, notificationRepository, emailService)

const histotyRepository = new HistoryRepository()
const configRepository = new ConfigRepository()

const alertAutomationObserver = new AlertAutomationObserver(histotyRepository, configRepository, monitorRepository)

adafruitHandler.subscribe(persistDataOberver)
adafruitHandler.subscribe(alertDataObserver)
adafruitHandler.subscribe(alertAutomationObserver)

export const mqttUseCase = new MqttUseCase(
    mqttRepository,
    adafruitHandler,
    monitorRepository,
)

mqttUseCase.listenAllFeed()

export function createMqttController() {
    return new MqttController(mqttUseCase)
}