import { NotificationController } from "../presentation/controllers/notification-controller";
import { NotifyUseCase } from "../domain/usecases/notify";
import { NotificationRepository } from "../infrastructure/repositories/prisma-notification-repository";


export const notificationRepository = new NotificationRepository()

export function createNotificationController() {
    const notifyUseCase = new NotifyUseCase(notificationRepository)
    return new NotificationController(notifyUseCase)
}