import { Device } from "@prisma/client"
import { LargeNumberLike } from "crypto"

export interface IDeviceRepository {
    findDeviceBySubject(subject: string): Promise<Device | null>
    findAllDevices(): Promise<Device[] | null>
    createDevice(id: string, name: string, feed: string, prefixMessage: string, description: string, power: number, type: number): Promise<Device>
    turnDevice(subject: string, status: boolean): Promise<Device>
    turnDeviceManual(subject: string, status: boolean): Promise<Device>
    updateDevice(id: string, status?: boolean, name?: string, feed?: string, prefixMessage?: string, description?: string, power?: number, type?: number): Promise<Device>
    deleteDevice(id: string): Promise<Device | null>
}
