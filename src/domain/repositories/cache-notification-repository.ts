export interface ICacheNotification {
    pop(userId: number): any | null
    push(obj: any): void
}