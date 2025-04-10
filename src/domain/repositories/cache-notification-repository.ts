export interface ICacheNotification {
    pop(): any | null
    push(obj: any): void
}