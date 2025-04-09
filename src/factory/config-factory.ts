import { ConfigController } from "../presentation/controllers/config-controller";
import { ConfigUseCase } from "../domain/usecases/config";
import { ConfigSchedulerUseCase } from "../domain/usecases/config-schedule";
import { ConfigRepository } from "../infrastructure/repositories/prisma-config-repository";
import { DeviceRepository } from "../infrastructure/repositories/prisma-device-repository";
import { HistoryRepository } from "../infrastructure/repositories/prisma-history-repository";
import { EmailService } from "../infrastructure/services/gmail";

const deviceRepository = new DeviceRepository();
const configRepository = new ConfigRepository();
const historyRepository = new HistoryRepository();
const emailService = new EmailService();
const configUsecase = new ConfigUseCase(configRepository);
const configController = new ConfigController(configUsecase);

const configSchedulerUseCase = new ConfigSchedulerUseCase(configRepository, deviceRepository, historyRepository, emailService)

configSchedulerUseCase.startScheduler()

export function createConfigController() {
    return configController;
}
