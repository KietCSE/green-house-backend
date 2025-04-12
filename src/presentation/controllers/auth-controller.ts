import { AuthenticationUseCase } from "../../domain/usecases/authenticate"
import { NextFunction, Request, Response } from "express"

export class AuthenticationController {

    constructor(private authenticationUseCase: AuthenticationUseCase) { }

    public async authenticate(req: Request, res: Response, next: NextFunction) {
        try {
            await this.authenticationUseCase.authenticateUser(req, res)
        }
        catch (error) {
            next(error)
        }
    }

    public async register(req: Request, res: Response, next: NextFunction) {
        try {
            await this.authenticationUseCase.registerUser(req, res)
        }
        catch (error) {
            next(error)
        }
    }

    public async turnOnOffNotification(req: Request, res: Response, next: NextFunction) {
        try {
            const { value } = req.body
            const userid = Number(req.userid)
            const updated = await this.authenticationUseCase.turnOnOffNotification(value, userid)

            if (updated)
                res.status(200).json({ status: true, message: `Update notification of user to ${value}` })
            else
                res.status(200).json({ status: false, message: `Update notification of user to ${value}` })
        }
        catch (error) {
            next(error)
        }
    }

}

