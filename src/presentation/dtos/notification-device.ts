export class NotificationDevice {
    private deviceName: string;
    private deviceDescription: string | null;
    private configDescription: string | null;
    private conditionDescription: string | null;
    private conditionOperator: string;
    private conditionThreshold: string;
    private currentValue: number;

    constructor(
        deviceName: string,
        deviceDescription: string | null,
        configDescription: string | null,
        conditionDescription: string | null,
        conditionOperator: string,
        conditionThreshold: string,
        currentValue: number,
    ) {
        this.deviceName = deviceName;
        this.deviceDescription = deviceDescription;
        this.configDescription = configDescription;
        this.conditionDescription = conditionDescription;
        this.conditionOperator = conditionOperator;
        this.conditionThreshold = conditionThreshold;
        this.currentValue = currentValue;
    }

    public getDeviceName() { return this.deviceName }
    public getDeviceDescription() { return this.deviceDescription }
    public getConfigDescription() { return this.configDescription }
    public getConditionDescription() { return this.conditionDescription }
    public getOperator() { return this.conditionOperator }
    public getThreshold() { return this.conditionThreshold }
    public getValue() { return this.currentValue }
}

export class NotificationSchedule {
    private deviceName: string;
    private deviceDescription: string | null;
    private configDescription: string | null;
    private scheduleStart: string;
    private scheduleEnd: string;
    private repetition: string | null;

    constructor(
        deviceName: string,
        deviceDescription: string | null,
        configDescription: string | null,
        scheduleStart: string,
        scheduleEnd: string,
        repetition: string | null
    ) {
        this.deviceName = deviceName;
        this.deviceDescription = deviceDescription;
        this.configDescription = configDescription;
        this.scheduleStart = scheduleStart;
        this.scheduleEnd = scheduleEnd;
        this.repetition = repetition;
    }

    public getDeviceName() { return this.deviceName }
    public getDeviceDescription() { return this.deviceDescription }
    public getConfigDescription() { return this.configDescription }
    public getScheduleStart() { return this.scheduleStart }
    public getScheduleEnd() { return this.scheduleEnd }
    public getRepetition() { return this.repetition }
}
