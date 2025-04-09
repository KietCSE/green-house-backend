import { NotificationController } from "../presentation/controllers/notification-controller";
import { NotifyUseCase } from "../domain/usecases/notify";
import { NotificationRepository } from "../infrastructure/repositories/prisma-notification-repository";
import { CacheNotification } from "../infrastructure/repositories/inside-notification-repository";

CacheNotification.getInstance()
export const notificationRepository = new NotificationRepository()

export function createNotificationController() {
    const notifyUseCase = new NotifyUseCase(notificationRepository)
    return new NotificationController(notifyUseCase)
}