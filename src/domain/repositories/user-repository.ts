import { User } from "@prisma/client";

export interface IUserRepository {
    findByName(name: string): Promise<User | null>;
    createUser(name: string, password: string, email: string): Promise<User>;
}
