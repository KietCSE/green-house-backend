
import { IMonitorRepository } from "../repositories/monitor-repository"
import { MonitoringSubject } from "@prisma/client";
import config from '../../config/load-config';
import axios from "axios";
import { MqttUseCase } from "./mqtt";


export class LoadMonitorUseCase {
    constructor(
        private monitorRepository: IMonitorRepository,
        private mqttUsecase: MqttUseCase
    ) { }

    public async loadAllSubject(): Promise<MonitoringSubject[] | null> {
        const monitorList = await this.monitorRepository.findAllSubject()
        return monitorList
    }

    public async loadAllSubjectName(): Promise<string[] | null> {
        const listName = await this.monitorRepository.loadAllFeedName()
        return listName
    }

    private async checkFeedExists(feed: string): Promise<boolean> {
        const url = `https://io.adafruit.com/api/v2/${config.AIO_USERNAME}/feeds/${feed}`;

        try {
            const response = await axios.get(url, {
                headers: { "X-AIO-Key": config.AIO_KEY }, // API Key của Adafruit IO
            });
            return response.status === 200;
        } catch (error) {
            console.error(`Feed ${feed} không tồn tại hoặc không truy cập được.`);
            return false;
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

        // check if the feed has already existed ? 
        const isExisted = await this.checkFeedExists(feed)

        console.log("is exist ", isExisted)

        if (!isExisted) {
            try {
                const response = await axios.post(
                    `https://io.adafruit.com/api/v2/${config.AIO_USERNAME}/feeds`,
                    {
                        name: feed,
                        description: description,
                        visibility: 'public',
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-AIO-Key": config.AIO_KEY,
                        },
                    }
                );
                this.mqttUsecase.subscribeToFeed(feed)
                console.log("Feed created and subscribe", feed);
            }
            catch (error) {
                console.error(error)
                throw new Error('Can not create new feed')
            }
        }

        const isSaved = await this.monitorRepository.addMonitorSubject(name, description, unit, upperbound, lowerbound, feed)
        return isSaved
    }

    public async updateMonitorSubject(
        name: string,
        description: string,
        unit: string,
        upperbound: number,
        lowerbound: number,
        feed: string,
    ): Promise<boolean> {
        const isUpdated = await this.monitorRepository.updateMonitorSubject(name, description, unit, upperbound, lowerbound, feed)
        return isUpdated
    }


    // chi xoa feed tren 
    public async deleteMonitorSubject(feed: string): Promise<boolean> {

        const deleted = await this.monitorRepository.deleteMonitorSubject(feed)

        const url = `https://io.adafruit.com/api/v2/${config.AIO_USERNAME}/feeds/${feed}`;

        try {
            const response = await axios.delete(url, {
                headers: {
                    "X-AIO-Key": config.AIO_KEY,
                    "Content-Type": "application/json"
                }
            });
            console.log("Feed deleted successfully:", feed);
        } catch (error) {
            console.error(error)
            throw new Error('Can not delete feed')
        }

        return true
    }
}

