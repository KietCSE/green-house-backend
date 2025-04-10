
export interface IDataRepository {
    findDataByDateAndSubject(monitoringSubjectId: number, pageSize: number, page: number, startDate?: Date, endDate?: Date): Promise<{ data: any[]; total: number }>
    saveData(data: string, feed: string): Promise<boolean>
}



