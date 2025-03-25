import { body, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const setAlertValdation: ValidationChain[] = [
    body("feed")
        .notEmpty()
        .withMessage("Feed is required")
        .isString()
        .withMessage("Feed is string"),
    body("alertDes")
        .optional()
        .isString()
        .withMessage("alertDes must be a string"),
    body("alertupperbound")
        .notEmpty().withMessage("alertupperbound is required")
        .isInt()
        .withMessage("Page must be a number"),
    body("alertlowerbound")
        .notEmpty().withMessage("alertlowerbound is required")
        .isNumeric() // Kiểm tra định dạng ngày tháng ISO 8601
        .withMessage("startDate must be number")
        .custom((value, { req }) => {
            if (Number(value) >= Number(req.body.alertupperbound)) {
                throw new Error("lowerbound must be less than upperbound");
            }
            return true;
        }),
    body("status")
        .notEmpty().withMessage("status is required")
        .isBoolean().withMessage("status musst be boolean"),
    body("email")
        .notEmpty().withMessage("email is required")
        .isBoolean().withMessage("email musst be boolean"),
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
