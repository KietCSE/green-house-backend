import { NotificationController } from "../presentation/controllers/notification-controller";
import { NotifyUseCase } from "../domain/usecases/notify";
import { NotificationRepository } from "../infrastructure/repositories/prisma-notification-repository";

export function createNotificationController() {
    const notificationRepository = new NotificationRepository()
    const notifyUseCase = new NotifyUseCase(notificationRepository)
    return new NotificationController(notifyUseCase)
}