import { query, body, param, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const LoadNotification: ValidationChain[] = [
    query("pageSize")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("PageSize must be a number between 1 and 100"),
    query("page")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Page must be a number greater than 0"),
]


export const UpdateNotification: ValidationChain[] = [
    param("id")
        .isNumeric()
        .withMessage("Id must be a number"),
    body("value")
        .isBoolean()
        .withMessage("Value must be a boolean"),
]

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
