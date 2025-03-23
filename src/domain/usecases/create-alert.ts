import { IMonitorRepository } from "../repositories/monitor-repository";

export class AlertUseCase {
    constructor(private monitorRepository: IMonitorRepository) { }

    public async setAlertInformation(
        feed: string,
        alertDes: string,
        alertupperbound: number,
        alertlowerbound: number
    ): Promise<boolean> {
        return await this.monitorRepository.setAlertInformation(feed, alertDes, alertupperbound, alertlowerbound)
    }

    public async updateAlertStatus(feed: string, status: boolean): Promise<boolean> {
        return await this.monitorRepository.updateWarningStatus(feed, status)
    }
}