import { User } from "@prisma/client";

export interface IUserRepository {
    findByName(name: string): Promise<User | null>;
    createUser(name: string, password: string, email: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>
    turnOnOffNotification(value: boolean, userid: number): Promise<boolean>
    getUserInfo(userid: number): Promise<any>
    getAllUserId(): Promise< number[]>
}




