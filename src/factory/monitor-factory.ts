import { MonitorController } from "../presentation/controllers/monitor-controller";
import { LoadMonitorUseCase } from "../domain/usecases/load-monitor";
import { MonitorRepository } from "../infrastructure/repositories/prisma-monitor-repository";

export function createMonitorController() {
    const monitorRepository = new MonitorRepository();
    const loadMonitorUseCase = new LoadMonitorUseCase(monitorRepository);
    const monitorController = new MonitorController(loadMonitorUseCase);
    return monitorController;
}
