import { query, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const LoadDataValidation: ValidationChain[] = [
    query("id")
        .notEmpty()
        .withMessage("Id is required")
        .isInt()
        .withMessage("Id is a number"),
    query("pageSize")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("PageSize must be a number between 1 and 100"),
    query("page")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Page must be a number greater than 0"),
    query("endDate")
        .optional()
        .isISO8601() // Kiểm tra định dạng ngày tháng ISO 8601
        .withMessage("startDate must be a valid date in ISO 8601 format (e.g., YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)"),
    query("startDate")
        .optional()
        .isISO8601() // Kiểm tra định dạng ngày tháng ISO 8601
        .withMessage("endDate must be a valid date in ISO 8601 format (e.g., YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)"),

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
