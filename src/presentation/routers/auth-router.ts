import { Router, Request, Response, NextFunction } from "express";
import { createAuthController } from "../../factory/auth-factory";
import { validationAuth, validateRequest } from "../middleware/auth-validation";
import { verifyToken } from "../middleware/jwt-validation";
const router: Router = Router();

const { authenticationController } = createAuthController();

router.post("/login",
    validationAuth, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { authenticationController.authenticate(req, res, next) })


router.post("/register",
    validationAuth, validateRequest,
    (req: Request, res: Response, next: NextFunction) => { authenticationController.register(req, res, next) })


router.patch('/notify',
    verifyToken,
    (req: Request, res: Response, next: NextFunction): any => {
        try {
            console.log(req.userid);
            return res.status(200).json({ message: 'Success' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Lỗi server' });
        }
    }
    
)

export default router