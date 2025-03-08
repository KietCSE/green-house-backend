import { IDeviceRepository } from "../../domain/repositories/device-repository"
import { Device } from '@prisma/client'
import prisma from '../../config/prisma-config'

export class DeviceRepository implements IDeviceRepository {
    public async findDeviceBySubject(subject: string): Promise<Device | null> {
        const device = await prisma.device.findFirst({  // Có thể tìm theo Id và tên
            where: { 
                OR: [
                    { id: subject },   // Tìm theo ID
                    { name: subject }  // Tìm theo tên
                ]
            },
            include: {
                Configuration: true,
                DeviceHistory: true
            }
        })
        return device
    }

    public async createDevice(id: string, name: string, feed: string, description: string): Promise<Device> {
        const power = 0
        const status = false
        const newDevice = await prisma.device.create({ data : {id, name, feed, description, power, status} })
        return newDevice
    }
}