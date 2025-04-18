import { IUserRepository } from "../../domain/repositories/user-repository";
import { PrismaClient, User } from "@prisma/client";
import prisma from "../../config/prisma-config";

export class UserRepository implements IUserRepository {
    public async findByName(name: string): Promise<User | null> {
        try {
            const oldUser = await prisma.user.findFirst({ where: { name } });
            return oldUser;
        } catch (error) {
            console.error(`Error in findByName: ${error}`);
            throw new Error(`Failed to find user by name`);
        }
    }

    public async createUser(name: string, password: string, email: string): Promise<User> {
        try {
            const newUser = await prisma.user.create({ data: { name, password, email } });
            return newUser;
        } catch (error) {
            console.error(`Error in createUser: ${error}`);
            throw new Error(`Failed to create user`);
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            const createdEmail = await prisma.user.findFirst({ where: { email: email } });
            return createdEmail;
        } catch (error) {
            console.error(`Error in findByEmail: ${error}`);
            throw new Error(`Failed to find user by email`);
        }
    }

    public async turnOnOffNotification(value: boolean, userid: number): Promise<boolean> {
        try {
            const updated = await prisma.user.update({
                where: { id: userid },
                data: { receiveNotification: value },
            });
            return !!updated;
        } catch (error) {
            console.error(`Error in turnOnOffNotification: ${error}`);
            throw new Error(`Failed to update notification settings`);
        }
    }

    public async getUserInfo(userid: number): Promise<any> {
        try {
            const user = await prisma.user.findFirst({
                where: { id: userid },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    receiveNotification: true
                }
            })

            if (user) return user
            else return null
        }
        catch (error) {

        }
    }

}