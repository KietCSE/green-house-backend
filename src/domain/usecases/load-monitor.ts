
import { MonitorRepository } from "../../infrastructure/repositories/prisma-monitor-repository";

import { MonitoringSubject } from "@prisma/client";

export class LoadMonitorUseCase {
    constructor(private monitorRepository: MonitorRepository) { }

    public async loadAllSubject(): Promise<MonitoringSubject[] | null> {
        const monitorList = await this.monitorRepository.findAllSubject()
        return monitorList
    }
}