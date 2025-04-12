import { IDeviceRepository } from "../../domain/repositories/device-repository"
import { Device, DeviceHistoryInfo } from '@prisma/client'
import prisma from '../../config/prisma-config'
import { MqttRepository } from "./adafruit-mqtt-repository"
import config from '../../config/load-config';
import { HistoryRepository } from "./prisma-history-repository";

export class DeviceRepository implements IDeviceRepository {
    private mqttRepository = new MqttRepository();
    private historyRepository = new HistoryRepository();

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

    public async createDevice(id: string, name: string, feed: string,  prefixMessage: string, description: string, power: number): Promise<Device> {
        const status = false
        const newDevice = await prisma.device.create({ data : {id, name, feed, prefixMessage, description, power, status} })
        return newDevice
    }

    public async turnDeviceManual(subject: string, status: boolean): Promise<Device> {
        const turnedDevice = await this.turnDevice(subject, status)
        if (turnedDevice.status) await this.historyRepository.createHistory(DeviceHistoryInfo.Manual, turnedDevice.id)
        return turnedDevice
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

        const feed_name = `${config.AIO_USERNAME}/feeds/${turnDevice.feed}`;
        
        if (status) {
            var power = turnDevice.power
            if (power === -1) power = 100
            this.mqttRepository.publish(feed_name, turnDevice.prefixMessage + power.toString())
        } else {
            this.mqttRepository.publish(feed_name, turnDevice.prefixMessage + "0")
        }

        console.log("Device turn:", turnDevice.id, status)

        return turnDevice;
    }

    public async updateDevice(id: string, status?: boolean, name?: string, feed?: string, prefixMessage?: string, description?: string, power? :number): Promise<Device> {
        const updatedDevice = await prisma.device.update({
            where: { id },
            data: { name, status, feed, prefixMessage, description, power }
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