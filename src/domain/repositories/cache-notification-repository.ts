import { NotificationInfo } from "../../presentation/dtos/notification"

export interface ICacheNotification {
    pop(): NotificationInfo | null
    push(obj: any): void
}