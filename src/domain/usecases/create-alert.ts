import { IMonitorRepository } from "../repositories/monitor-repository";

export class AlertUseCase {
    constructor(private monitorRepository: IMonitorRepository) { }

    public async setAlertInformation(
        subject: string,
        alertDes: string,
        alertupperbound: number,
        alertlowerbound: number
    ): Promise<boolean> {
        return await this.monitorRepository.setAlertInformation(subject, alertDes, alertupperbound, alertlowerbound)
    }

    public async updateAlertStatus(subject: string, status: boolean): Promise<boolean> {
        return await this.monitorRepository.updateWarningStatus(subject, status)
    }
}