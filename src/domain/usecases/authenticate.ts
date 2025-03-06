import { AuthenticationRepository } from '../../infrastructure/repositories/prisma-auth-repository'
import { Request, Response } from 'express'

export class AuthenticationUseCase {

    constructor(private authenticationRepository: AuthenticationRepository) { }

    public async authenticateUser(req: Request, res: Response) {
        const { username, password, email } = req.body
        console.log(username, password, email)
        const user = await this.authenticationRepository.findByName(username)
        console.log(user)
        if (user) {
            if (user.password === password) {
                return res.status(200).json({ status: true, message: "Login successfully" })
            }
            else return res.status(401).json({ status: false, message: "Invalid password" })
        }
        else return res.status(404).json({ status: false, message: "User not found" })
    }

    public async registerUser(req: Request, res: Response) {
        const { username, password, email } = req.body
        const user = await this.authenticationRepository.findByName(username)
        if (user) return res.status(409).json({ status: false, message: "User already exists" })
        else {
            const newUser = await this.authenticationRepository.createUser(username, password, email)
            return res.status(200).json({ status: true, message: "User created successfully" })
        }
    }
}

