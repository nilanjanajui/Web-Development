import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export function requireRole(...roles: Array<"CUSTOMER" | "PROVIDER" | "ADMIN">) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            throw new AppError(401, "UNAUTHENTICATED", "Authentication required");
        }
        if (!roles.includes(req.user.role)) {
            throw new AppError(403, "FORBIDDEN", "You do not have permission to perform this action");
        }
        next();
    };
}