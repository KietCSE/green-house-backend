import { Device } from "@prisma/client"

export interface IDeviceRepository {
    findDeviceBySubject(subject: string): Promise<Device | null>
    findAllDevices(): Promise<Device[] | null>
    createDevice(name: string, feed: string, prefixMessage: string, description: string, power: number, type: number): Promise<Device>
    turnDevice(subject: string, status: boolean): Promise<Device>
    turnDeviceManual(subject: string, status: boolean): Promise<Device>
    updateDevice(id: string, name?: string, status?: boolean, feed?: string, prefixMessage?: string, description?: string, power?: number, type?: number): Promise<Device>
    setScheduledStatus(id: string, status: boolean): Promise<Device>
    deleteDevice(id: string): Promise<Device | null>
}
