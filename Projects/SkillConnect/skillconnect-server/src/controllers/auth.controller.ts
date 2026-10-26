import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { registerUser, loginUser, getCurrentUser } from "../services/auth/auth.service";

export const register = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await registerUser(req.body);
    sendSuccess(res, 201, "User registered successfully", { user, token });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    const { user, token } = await loginUser(req.body);
    sendSuccess(res, 200, "Login successful", { user, token });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    const user = await getCurrentUser(req.user!.userId);
    sendSuccess(res, 200, "Current user retrieved successfully", user);
});