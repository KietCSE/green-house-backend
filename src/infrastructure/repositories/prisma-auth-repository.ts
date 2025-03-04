import { IUserRepository } from "../../domain/repositories/user-repository"
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({ log: ["query"] })

export class AuthenticationRepository implements IUserRepository {
    public save() {
        console.log("get data successfully")
    }
}




