// import { AuthenticationRepository } from '../../infrastructure/repositories/prisma-auth-repository'
import { Request, Response } from 'express'
import ResponseEnity from '../../presentation/dtos/responseEntity'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { IUserRepository } from '../repositories/user-repository'
import config from '../../config/load-config';

export class AuthenticationUseCase {

    constructor(private authenticationRepository: IUserRepository) { }

    public async authenticateUser(req: Request, res: Response) {
        const { username, password, email } = req.body
        console.log(username, password, email)
        const user = await this.authenticationRepository.findByName(username)
        console.log(user)

        if (user) {
            const isValidPassword = await bcrypt.compare(password, user.password)

            if (isValidPassword) {

                const token = jwt.sign(
                    { id: user.id, username: user.name, email: user.email },
                    config.JWT_SECRET || 'nothing',
                    { expiresIn: '1h' },
                )

                const response = new ResponseEnity.Builder()
                    .setStatus(true)
                    .setData({ username: user.name, email: user.email, token })
                    .setMessage("Login successfully")
                    .build()

                return res.status(200).json(response)
            }

            else return res.status(401).json({ status: false, message: "Invalid password" })
        }
        else return res.status(404).json({ status: false, message: "User not found" })

    }

    public async registerUser(req: Request, res: Response) {
        const { username, password, email } = req.body
        const user = await this.authenticationRepository.findByName(username)
        const userEmail = await this.authenticationRepository.findByEmail(email)

        if (user)
            return res.status(409).json({ status: false, message: "User already exists" })
        else if (userEmail)
            return res.status(409).json({ status: false, message: "Email already exists" })
        else {
            const encodePassword = await bcrypt.hash(password, 10)
            const newUser = await this.authenticationRepository.createUser(username, encodePassword, email)
            return res.status(200).json({ status: true, message: "User created successfully" })
        }
    }

    public async turnOnOffNotification(value: boolean, userid: number): Promise<boolean> {
        const data = await this.authenticationRepository.turnOnOffNotification(value, userid)
        return data
    }

    public async getUserInfo(userid: number): Promise<any> {
        const data = await this.authenticationRepository.getUserInfo(userid)
        return data
    }
}

