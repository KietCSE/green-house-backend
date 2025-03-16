import { DataController } from "../presentation/controllers/data-controller";
import { GetDataUseCase } from "../domain/usecases/data";
import { DataRepository } from "../infrastructure/repositories/prisma-data-repository";

export const dataRepository = new DataRepository();

export function createDataController() {
    const getDataUseCase = new GetDataUseCase(dataRepository);
    const dataController = new DataController(getDataUseCase);
    return dataController;
}
