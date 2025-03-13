import { Device } from "@prisma/client"

export interface IDeviceRepository {
    findDeviceBySubject(subject: string): Promise<Device | null>
    createDevice(id: string, name: string, feed: string, description: string): Promise<Device>
}