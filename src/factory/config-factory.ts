import { ConfigController } from "../presentation/controllers/config-controller";
import { ConfigUseCase } from "../domain/usecases/config";
import { ConfigRepository } from "../infrastructure/repositories/prisma-config-repository";

export function createConfigController() {
    const configRepository = new ConfigRepository();
    const configUsecase = new ConfigUseCase(configRepository);
    const configController = new ConfigController(configUsecase);
    return configController;
}
