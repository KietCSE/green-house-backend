import { IUserRepository } from "../../domain/repositories/user-repository"
import { PrismaClient, User } from "@prisma/client";
import prisma from '../../config/prisma-config'

export class AuthenticationRepository implements IUserRepository {
    public async findByName(name: string): Promise<User | null> {
        const oldUser = await prisma.user.findFirst({ where: { name } })
        return oldUser
    }

    public async createUser(name: string, password: string, email: string): Promise<User> {
        const newUser = await prisma.user.create({ data: { name, password, email } })
        return newUser
    }

}




