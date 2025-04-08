import { Notification } from "@prisma/client";
import { MonitoringSubject } from "@prisma/client";


// data object for sending email 
export class NotificationData {
    notification: Notification;
    monitoringSubject: MonitoringSubject;

    constructor(notification: Notification, monitoringSubject: any) {
        this.notification = notification;
        this.monitoringSubject = monitoringSubject;
    }
}


export class NotificationInfo {
    private id: number
    private name: string
    private description: string | null
    private lowerbound: number | null
    private upperbound: number | null
    private value: number
    private unit: string
    private date: Date

    constructor(
        id: number,
        name: string,
        desctiption: string | null,
        lowerbound: number | null,
        upperbound: number | null,
        value: number,
        date: Date,
        unit: string
    ) {
        this.id = id
        this.date = date
        this.description = desctiption
        this.lowerbound = lowerbound
        this.upperbound = upperbound
        this.unit = unit
        this.value = value
        this.name = name
    }

    public getName() { return this.name }
    public getLowerbound() { return this.lowerbound }
    public getUpperbound() { return this.upperbound }
    public getDes() { return this.description }
    public getValue() { return this.value }
    public getUnit() { return this.unit }
    public getDate() { return this.date }
    public getId() { return this.id }
}