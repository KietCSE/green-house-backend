export interface IMqttRepository {
    publish(feed: string, message: string): void;
    subscribe(feed: string, callback: (message: string) => void): void;
}