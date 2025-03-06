import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

// Chỉ chứa ValidationChain[]
export const validationAuth: ValidationChain[] = [
    body("email").normalizeEmail().isEmail().withMessage("Email is not valid"),
    body("username")
        .isString().withMessage("Username is not valid")
        .notEmpty().withMessage("Username is required"),
    body("password")
        .isString().withMessage("Password is not valid")
        .notEmpty().withMessage("Password is required"),
];

// Middleware để xử lý lỗi
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            status: false,
            error: errors.array(),
        });
        return
    }
    next();
};


