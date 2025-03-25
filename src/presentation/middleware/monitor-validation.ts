import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const addMonitorSubject: ValidationChain[] = [
    body("name")
        .notEmpty().withMessage("name is required")
        .isString().withMessage("Subject is required"),
    body("description")
        .notEmpty().withMessage("description is required")
        .isString().withMessage("description is string"),
    body("unit")
        .notEmpty().withMessage("unit is required")
        .isString().withMessage("unit is string"),
    body("upperbound")
        .notEmpty().withMessage("upperbound is required")
        .isNumeric().withMessage("upperbound is number"),
    body("lowerbound")
        .notEmpty().withMessage("lowerbound is required")
        .isNumeric().withMessage("lowerbound is number"),
    body("lowerbound")
        .notEmpty().withMessage("lowerbound is required")
        .isNumeric().withMessage("lowerbound must be a number")
        .custom((value, { req }) => {
            if (Number(value) >= Number(req.body.upperbound)) {
                throw new Error("lowerbound must be less than upperbound");
            }
            return true;
        }),
    body("feed")
        .notEmpty().withMessage("feed is required")
        .isString().withMessage("feed is string"),
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
