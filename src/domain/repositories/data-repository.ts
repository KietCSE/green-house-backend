
export interface IDataRepository {
    findDataByDateAndSubject(subject: string, pageSize: number, page: number, startDate?: Date, endDate?: Date): Promise<any[]>
    saveData(data: string, feed: string): Promise<boolean>
}



