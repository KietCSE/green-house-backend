import { Device } from "@prisma/client"

export interface IDeviceRepository {
    findDeviceBySubject(subject: string): Promise<Device | null>
    findAllDevices(): Promise<Device[] | null>
    createDevice(id: string, name: string, feed: string, prefixMessage: string, description: string): Promise<Device>
    turnDevice(subject: string, status: boolean): Promise<Device>
    updateDevice(id: string, name?: string, feed?: string, prefixMessage?: string, description?: string): Promise<Device>
    deleteDevice(id: string): Promise<Device | null>
}