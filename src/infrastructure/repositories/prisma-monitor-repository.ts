import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { Data, MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class MonitorRepository implements IMonitorRepository {
    public async findDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
        return monitor
    }

    public async findAllSubject(): Promise<MonitoringSubject[] | null> {
        const data = await prisma.monitoringSubject.findMany()
        return data
    }

    public async loadAllSubjectName(): Promise<string[] | null> {
        const listName = await prisma.monitoringSubject.findMany({ select: { name: true } })
        const stringName = listName.map((item) => item.name)
        return stringName
    }

    public async checkMonitor(subject: string, data: number): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
            if (!monitor) {
                return false
            }
            if (monitor.alertupperbound && data > monitor.alertupperbound || monitor.alertlowerbound && data < monitor.alertlowerbound) {
                return true
            }
            return false
        }
        catch (error) {
            throw Error("Can not check monitor")
        }
    }

    public async updateWarningStatus(subject: string, status: boolean): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
            if (!monitor) {
                throw Error("Can not find monitor")
            }
            await prisma.monitoringSubject.update({
                where: { id: monitor.id },
                data: { warning: status }
            })
            return true
        }
        catch (error) {
            throw Error("Can not update warning status")
        }
    }


    public async setAlertInformation(subject: string, alertDes: string, alertupperbound: number, alertlowerbound: number): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
            if (!monitor) {
                throw Error("Can not find monitor")
            }
            const data = await prisma.monitoringSubject.update({
                where: { id: monitor.id },
                data: { alertDes: alertDes, alertupperbound: alertupperbound, alertlowerbound: alertlowerbound }
            })
            return true
        }
        catch (error) {
            throw Error("Can not set alert information")
        }
    }

    public async addMonitorSubject(
        name: string,
        description: string,
        unit: string,
        upperbound: number,
        lowerbound: number
    ): Promise<boolean> {
        try {
            const isCreated = await prisma.monitoringSubject.findFirst({ where: { name } })
            if (isCreated) throw Error(`Monitor subject with name "${name}" already exists.`);

            const isSaved = await prisma.monitoringSubject.create({
                data: {
                    name,
                    description,
                    unit,
                    lowerbound,
                    upperbound,
                    warning: false,
                    email: false
                }
            })
            return true
        }
        catch (error) {
            console.error("Error saving monitor subject:", error);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Can not save monitor subject");
            }
        }
    }
}




