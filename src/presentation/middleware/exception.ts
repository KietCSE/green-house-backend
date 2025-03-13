import { Request, Response, NextFunction } from "express";

// Định nghĩa kiểu dữ liệu cho lỗi tùy chỉnh
interface CustomError extends Error {
    status?: number;
}

// Middleware xử lý lỗi tập trung
export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(err); // Log lỗi để debug

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: false,
        message: err.message || "Internal Server Error",
    });
};
