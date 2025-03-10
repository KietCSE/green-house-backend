import { DeviceController } from "../presentation/controllers/device-controller";
import { DeviceUsecase } from "../domain/usecases/device";
import { DeviceRepository } from "../infrastructure/repositories/prisma-device-repository";

export function createDeviceController() {
    const deviceRepository = new DeviceRepository();
    const deviceUsecase = new DeviceUsecase(deviceRepository);
    const deviceController = new DeviceController(deviceUsecase);
    return deviceController;
}
