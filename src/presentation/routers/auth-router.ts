import { Router, Request, Response } from "express";
import { createAuthController } from "../../factory/auth-factory";

const router: Router = Router();

const { authenticationController } = createAuthController();

router.post("/login", (req: Request, res: Response) => { authenticationController.authenticate(req, res) })
router.post("/register", (req: Request, res: Response) => { authenticationController.register(req, res) })

export default router