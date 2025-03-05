import { IUserRepository } from "../../domain/repositories/user-repository"
import prisma from "../../config/prisma-config"


export class AuthenticationRepository implements IUserRepository {
    public save() {
        console.log("get data successfully")
    }
}




