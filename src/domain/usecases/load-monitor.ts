
import { IMonitorRepository } from "../../domain/repositories/monitor-repository"
import { MonitoringSubject } from "@prisma/client";

export class LoadMonitorUseCase {
    constructor(private monitorRepository: IMonitorRepository) { }

    public async loadAllSubject(): Promise<MonitoringSubject[] | null> {
        const monitorList = await this.monitorRepository.findAllSubject()
        return monitorList
    }
}