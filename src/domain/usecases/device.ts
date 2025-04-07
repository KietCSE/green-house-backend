import { DeviceRepository } from "../../infrastructure/repositories/prisma-device-repository"
import { Device } from '@prisma/client'
import { Request, Response } from "express";

export class DeviceUsecase {

    constructor(private deviceRepository: DeviceRepository) { }

    public async getDeviceBySubject(subject: string): Promise<Device | null> {
        return this.deviceRepository.findDeviceBySubject(subject)
    }

    public async getAllDevices(): Promise<Device[] | null> {
        return this.deviceRepository.findAllDevices();
    }

    public async createDevice(req: Request, res: Response) {
        const { id, name, feed, prefixMessage, description } = req.body
        const deviceById = await this.deviceRepository.findDeviceBySubject(id)
        if (deviceById) return res.status(409).json({ status: false, message: "Device's Id already exists" })

        const deviceByName = await this.deviceRepository.findDeviceBySubject(name)
        if (deviceByName) return res.status(409).json({ status: false, message: "Device's name already exists" })

        // Tạo device khi không trùng lặp id và name
        const newDevice = await this.deviceRepository.createDevice(id, name, feed, prefixMessage, description)
        return res.status(200).json({ status: true, message: "Device created successfully", data: newDevice })
    }

    public async turnDevice(req: Request, res: Response) {
        const { subject } = req.params;
        const { status } = req.body;

        const turnDevice = await this.deviceRepository.turnDevice(subject, status);
        return res.status(200).json({ status: true, message: "Device updated successfully", data: turnDevice })
    }

    public async updateDevice(req: Request, res: Response) {
        const { subject } = req.params;
        const { name, feed, prefixMessage, description, power } = req.body;
        
        const updatedDevice = await this.deviceRepository.updateDevice(subject, name, feed, prefixMessage, description, power);
        return res.status(200).json({ status: true, message: "Device updated successfully", data: updatedDevice })
    }

    public async deleteDevice(req: Request, res: Response) {
        const { subject } = req.params;
        
        const isDeleted = await this.deviceRepository.deleteDevice(subject);
        if (isDeleted) {
            return res.status(200).json({ status: true, message: "Device deleted successfully" });
        } else {
            return res.status(404).json({ status: false, message: "Device not found" });
        }
    }
}