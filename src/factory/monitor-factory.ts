import { MonitorController } from "../presentation/controllers/monitor-controller";
import { LoadMonitorUseCase } from "../domain/usecases/handle-monitor";
import { MonitorRepository } from "../infrastructure/repositories/prisma-monitor-repository";
import { AlertUseCase } from "../domain/usecases/create-alert";
import { mqttUseCase } from "./mqtt-factory";

export const monitorRepository = new MonitorRepository();

export function createMonitorController() {
    const loadMonitorUseCase = new LoadMonitorUseCase(monitorRepository, mqttUseCase);
    const alertUseCase = new AlertUseCase(monitorRepository);
    const monitorController = new MonitorController(loadMonitorUseCase, alertUseCase);
    return monitorController;
}
