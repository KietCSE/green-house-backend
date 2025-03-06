import { AuthenticationUseCase } from "../../domain/usecases/authenticate"
import { Request, Response } from "express"

export class AuthenticationController {

    constructor(private authenticationUseCase: AuthenticationUseCase) { }

    public async authenticate(req: Request, res: Response) {
        await this.authenticationUseCase.authenticateUser(req, res)
    }

    public async register(req: Request, res: Response) {
        await this.authenticationUseCase.registerUser(req, res)
    }
}

