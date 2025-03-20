
import { promises } from "dns";
import { IMonitorRepository } from "../repositories/monitor-repository"
import { MonitoringSubject } from "@prisma/client";

export class LoadMonitorUseCase {
    constructor(private monitorRepository: IMonitorRepository) { }

    public async loadAllSubject(): Promise<MonitoringSubject[] | null> {
        const monitorList = await this.monitorRepository.findAllSubject()
        return monitorList
    }

    public async loadAllSubjectName(): Promise<string[] | null> {
        const listName = await this.monitorRepository.loadAllSubjectName()
        return listName
    }

    public async addMonitorSubject(name: string, description: string, unit: string, upperbound: number, lowerbound: number): Promise<boolean> {
        const isSaved = await this.monitorRepository.addMonitorSubject(name, description, unit, upperbound, lowerbound)
        return isSaved
    }
}     