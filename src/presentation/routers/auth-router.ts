import { Router, Request, Response } from "express";
import { createAuthController } from "../../factory/auth-factory";

const router: Router = Router();

const { authenticationController } = createAuthController();

router.get("/login", (req: Request, res: Response) => { authenticationController.doSomething(req, res) })

export default router