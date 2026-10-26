import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";
import { AppError } from "../utils/appError";
import { prisma } from "../lib/prisma";
import { asyncHandler } from "../utils/asyncHandler";

export const authMiddleware = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppError(401, "MISSING_TOKEN", "Authentication token is required");
        }

        const token = authHeader.split(" ")[1];

        let payload;
        try {
            payload = verifyToken(token);
        } catch {
            throw new AppError(401, "INVALID_TOKEN", "Authentication token is invalid or expired");
        }

        const user = await prisma.user.findUnique({
            where: { id: payload.userId },
            select: { id: true, role: true, status: true },
        });

        if (!user) {
            throw new AppError(401, "USER_NOT_FOUND", "User no longer exists");
        }

        if (user.status === "SUSPENDED") {
            throw new AppError(403, "ACCOUNT_SUSPENDED", "This account has been suspended");
        }

        req.user = { userId: user.id, role: user.role };
        next();
    }
);