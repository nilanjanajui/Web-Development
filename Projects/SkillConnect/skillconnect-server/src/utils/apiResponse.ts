import { Response } from "express";

export function sendSuccess<T>(
    res: Response,
    statusCode: number,
    message: string,
    data: T,
    meta?: { page: number; limit: number; total: number; totalPages: number }
) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
        ...(meta && { meta }),
    });
}

export function sendError(
    res: Response,
    statusCode: number,
    message: string,
    code: string
) {
    return res.status(statusCode).json({
        success: false,
        message,
        error: { code },
    });
}