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
                Configuration: false,
                DeviceHistory: false
            }
        })
        return device
    }

    public async findAllDevices(): Promise<Device[] | []> {
        const devices = await prisma.device.findMany({
            include: {
                Configuration: false,
                DeviceHistory: false
            }
        })
        return devices;
    }

    public async createDevice(id: string, name: string, feed: string,  prefixMessage: string, description: string): Promise<Device> {
        const power = 0
        const status = false
        const newDevice = await prisma.device.create({ data : {id, name, feed, prefixMessage, description, power, status} })
        return newDevice
    }

    public async turnDevice(subject: string, status: boolean): Promise<Device> {
        const updateDevice = await prisma.device.findFirst({
            where: { 
                OR: [
                    { id: subject },  
                    { name: subject }
                ]
            }
        });

        if (!updateDevice) {
            throw new Error("Device not found");
        }
        
        const turnDevice = await prisma.device.update({
            where: { 
                id: updateDevice.id
            },
            data: {
                status
            }
        })

        return turnDevice;
    }

    public async updateDevice(id: string, name?: string, feed?: string, prefixMessage?: string, description?: string): Promise<Device> {
        const updatedDevice = await prisma.device.update({
            where: { id },
            data: { name, feed, prefixMessage, description }
        });
        return updatedDevice;
    }

    public async deleteDevice(id: string): Promise<Device | null> {
        try {
            const deletedDevice = await prisma.device.delete({ where: { id } });
            return deletedDevice;
        } catch (error) {
            return null;
        }
    }
}