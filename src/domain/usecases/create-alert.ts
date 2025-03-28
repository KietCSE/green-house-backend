import { IMonitorRepository } from "../repositories/monitor-repository";

export class AlertUseCase {
    constructor(private monitorRepository: IMonitorRepository) { }

    public async setAlertInformation(
        id: number,
        alertDes: string,
        alertupperbound: number,
        alertlowerbound: number,
        status: boolean,
        email: boolean
    ): Promise<boolean> {
        return await this.monitorRepository.setAlertInformation(
            id,
            alertDes,
            alertupperbound,
            alertlowerbound,
            status,
            email
        )
    }

    public async updateAlertStatus(feed: string, status: boolean): Promise<boolean> {
        return await this.monitorRepository.updateWarningStatus(feed, status)
    }
}