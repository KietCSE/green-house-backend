import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { Data, MonitoringSubject } from '@prisma/client'
import prisma from '../../config/prisma-config'


export class MonitorRepository implements IMonitorRepository {
    public async findDataBySubject(subject: string): Promise<MonitoringSubject | null> {
        const monitor = await prisma.monitoringSubject.findFirst({ where: { name: subject } })
        return monitor
    }

    public async findDataByFeed(subject: string): Promise<MonitoringSubject[] | null> {
        const monitor = await prisma.monitoringSubject.findMany({ where: { feed: subject } })
        return monitor
    }

    public async findAllSubject(): Promise<MonitoringSubject[] | null> {
        const data = await prisma.monitoringSubject.findMany({
            where: { delete: false },
            orderBy: { id: "asc" }
        })
        return data
    }

    public async loadAllSubjectName(): Promise<string[] | null> {
        const listName = await prisma.monitoringSubject.findMany({
            where: { delete: false },
            select: { name: true }
        })
        const stringName = listName.map((item) => item.name)
        return stringName
    }

    public async checkMonitor(feed: string, data: number): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { feed, delete: false } })
            if (!monitor) {
                return false
            }
            if (monitor.warning === false) return false
            if (monitor.alertupperbound && data > monitor.alertupperbound || monitor.alertlowerbound && data < monitor.alertlowerbound) {
                return true
            }
            return false
        }
        catch (error) {
            throw Error("Can not check monitor")
        }
    }

    public async updateWarningStatus(feed: string, status: boolean): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { feed, delete: false } })
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


    public async setAlertInformation(
        id: number,
        alertDes: string,
        alertupperbound: number,
        alertlowerbound: number,
        status: boolean,
        email: boolean
    ): Promise<boolean> {
        try {
            const monitor = await prisma.monitoringSubject.findFirst({ where: { id, delete: false } })
            if (!monitor) {
                throw Error("Can not find monitor, maybe id is wrong")
            }
            const data = await prisma.monitoringSubject.update({
                where: { id: monitor.id },
                data: {
                    alertDes,
                    alertupperbound,
                    alertlowerbound,
                    warning: status,
                    email
                }
            })
            return true
        }
        catch (error) {
            console.error("Error saving monitor subject:", error);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Can not set alert");
            }
        }
    }


    public async addMonitorSubject(
        name: string,
        description: string,
        unit: string,
        upperbound: number,
        lowerbound: number,
        feed: string
    ): Promise<boolean> {
        try {
            const feedIsCreated = await prisma.monitoringSubject.findFirst({ where: { feed, delete: false } })
            if (feedIsCreated) throw Error("This feed has already been existed")

            const isSaved = await prisma.monitoringSubject.create({
                data: {
                    name,
                    description,
                    unit,
                    lowerbound,
                    upperbound,
                    warning: false,
                    email: false,
                    feed,
                    alertlowerbound: 0,
                    alertupperbound: 0,
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

    public async updateMonitorSubject(
        name: string,
        description: string,
        unit: string,
        upperbound: number,
        lowerbound: number,
        id: number,
    ): Promise<boolean> {
        try {
            const feedIsCreated = await prisma.monitoringSubject.findFirst({ where: { id, delete: false } })
            if (!feedIsCreated) throw new Error("Id does not exist, cannot update");

            await prisma.monitoringSubject.update({
                where: { id: feedIsCreated.id },
                data: {
                    name,
                    description,
                    unit,
                    lowerbound,
                    upperbound,
                }
            });

            return true;
        }
        catch (error) {
            console.error("Error updating monitor subject:", error);
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Cannot update monitor subject");
            }
        }
    }

    // delete a monitor subject, if success -> return feed name, else return null 
    public async deleteMonitorSubject(id: number): Promise<string | null> {
        try {
            const feedIsCreated = await prisma.monitoringSubject.findFirst({ where: { id, delete: false } })
            if (!feedIsCreated) throw new Error("Id does not exist, cannot delete");

            const deleted = await prisma.monitoringSubject.update({
                where: { id: feedIsCreated.id },
                data: { delete: true }
            })

            if (!!deleted) return feedIsCreated.feed
            return null
        }
        catch (error) {
            console.error(error)
            if (error instanceof Error) {
                throw new Error(error.message);
            } else {
                throw new Error("Cannot delete monitor subject");
            }
        }
    }


    public async loadAllFeedName(): Promise<string[]> {
        try {
            const listName = await prisma.monitoringSubject.findMany({
                where: { delete: false },
                select: { feed: true }
            })
            const stringName = listName.map((item) => item.feed)
            return stringName
        }
        catch (error) {
            console.log(error)
            return []
        }

    }
}




