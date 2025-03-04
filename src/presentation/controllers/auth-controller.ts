import { AuthenticationUseCase } from "../../domain/usecases/authenticate"
import { Request, Response } from "express"

export class AuthenticationController {

    constructor(private authenticationUseCase: AuthenticationUseCase) { }

    public doSomething(req: Request, res: Response) {
        this.authenticationUseCase.doSomething()
        return res.status(200).json({ message: "success" })
    }
}

