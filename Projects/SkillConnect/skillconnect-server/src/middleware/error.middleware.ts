import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import { sendError } from "../utils/apiResponse";
import { env } from "../config/env";
import { Prisma } from "@prisma/client";

export function errorMiddleware(
    err: unknown,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) {
    if (err instanceof AppError) {
        return sendError(res, err.statusCode, err.message, err.code);
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            const target = (err.meta?.target as string[])?.join(", ") ?? "field";
            return sendError(res, 409, `A record with this ${target} already exists`, "DUPLICATE_ENTRY");
        }
        if (err.code === "P2025") {
            return sendError(res, 404, "Record not found", "RECORD_NOT_FOUND");
        }
    }

    console.error("Unhandled error:", err);

    const message =
        env.NODE_ENV === "development" && err instanceof Error
            ? err.message
            : "Internal server error";

    return sendError(res, 500, message, "INTERNAL_SERVER_ERROR");
}