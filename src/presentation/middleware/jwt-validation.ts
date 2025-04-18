import config from '../../config/load-config';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { body, validationResult, ValidationChain } from "express-validator";


export const verifyToken = (req: Request, res: Response, next: NextFunction): any => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ status: false, message: 'Token is required' });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;
        req.userid = decoded.id;
        next();
    } catch (error) {
        return res.status(403).json({ status: false, message: 'Token is invalid or expired' });
    }
};

export const turnOnOffNotification: ValidationChain[] = [
    body("value")
        .isBoolean()
        .withMessage("value is required"),
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
