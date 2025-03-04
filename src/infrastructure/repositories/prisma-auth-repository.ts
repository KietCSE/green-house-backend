import { IUserRepository } from "../../domain/repositories/user-repository"


export class AuthenticationRepository implements IUserRepository {
    public save() {
        console.log("get data successfully")
    }
}




