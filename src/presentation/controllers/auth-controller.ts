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
}

