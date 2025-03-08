import { HistoryDeviceController } from "../presentation/controllers/history-controller";
import { HandleHistoryUseCase } from "../domain/usecases/handle-history";
import { HistoryRepository } from "../infrastructure/repositories/prisma-history-repository";


export function createHistoryController() {
    const historyRepository = new HistoryRepository();
    const handleHistoryUseCase = new HandleHistoryUseCase(historyRepository);
    const historyDeviceController = new HistoryDeviceController(handleHistoryUseCase);
    return historyDeviceController;
}