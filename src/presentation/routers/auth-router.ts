import { Router, Request, Response, NextFunction } from "express";
import { createAuthController } from "../../factory/auth-factory";
import { validationAuth, validateRequest } from "../middleware/auth-validation";
import { verifyToken, turnOnOffNotification } from "../middleware/jwt-validation";

const router: Router = Router();

const { authenticationController } = createAuthController();

router.post("/login",
    validationAuth, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { authenticationController.authenticate(req, res, next) })


router.post("/register",
    validationAuth, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { authenticationController.register(req, res, next) })

router.patch('/notification',
    turnOnOffNotification, validateRequest,
    verifyToken,
    (req: Request, res: Response, next: NextFunction): any => {
        authenticationController.turnOnOffNotification(req, res, next)
    }
)

export default router