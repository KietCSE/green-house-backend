import { query, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";

enum DeviceHistoryInfo {
    Auto = "Auto",
    Scheduler = "Scheduler",
    Manual = "Manual"
}

export const LoadHistoryDeviceValidation: ValidationChain[] = [
    query("pageSize")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("PageSize must be an integer between 1 and 100"),
    query("page")
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage("Page must be an integer greater than 0"),
    query("startDate")
        .optional()
        .isISO8601()
        .withMessage("startDate must be a valid date in ISO 8601 format (e.g., YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)"),
    query("endDate")
        .optional()
        .isISO8601()
        .withMessage("endDate must be a valid date in ISO 8601 format (e.g., YYYY-MM-DD or YYYY-MM-DDTHH:mm:ssZ)"),
    query("deviceId")
        .optional()
        .isString()
        .withMessage("deviceId must be a valid string"),
    query("typeAction")
        .optional()
        .isIn(Object.values(DeviceHistoryInfo))
        .withMessage(`typeAction must be one of: ${Object.values(DeviceHistoryInfo).join(", ")}`),
    query("endDate")
        .optional()
        .custom((endDate, { req }) => {

            if (!req.query) {
                throw new Error("Query parameters are missing");
            }

            const startDate = req.query.startDate;

            if (startDate && endDate) {
                const start = new Date(startDate as string)
                const end = new Date(endDate as string)

                if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                    throw new Error("startDate and endDate must be valid dates")
                }

                if (start > end) {
                    throw new Error("startDate must be less than or equal to endDate")
                }
            }

            return true
        })
];

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
