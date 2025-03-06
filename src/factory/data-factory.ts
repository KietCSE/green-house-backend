import { DataController } from "../presentation/controllers/data-controller";
import { GetDataUseCase } from "../domain/usecases/data";
import { DataRepository } from "../infrastructure/repositories/prisma-data-repository";

export function createDataController() {
    const dataRepository = new DataRepository();
    const getDataUseCase = new GetDataUseCase(dataRepository);
    const dataController = new DataController(getDataUseCase);
    return dataController;
}
