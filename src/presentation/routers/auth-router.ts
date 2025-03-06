import { Router, Request, Response, NextFunction } from "express";
import { createAuthController } from "../../factory/auth-factory";
import { validationAuth, validateRequest } from "../middleware/auth-validation";
const router: Router = Router();

const { authenticationController } = createAuthController();

router.post("/login",
    validationAuth, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { authenticationController.authenticate(req, res, next) })


router.post("/register", (req: Request, res: Response) => { authenticationController.register(req, res) })



export default router