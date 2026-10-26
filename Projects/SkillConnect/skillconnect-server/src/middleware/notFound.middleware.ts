import { Request, Response } from "express";
import { sendError } from "../utils/apiResponse";

export function notFoundMiddleware(req: Request, res: Response) {
    sendError(res, 404, `Route ${req.method} ${req.originalUrl} not found`, "ROUTE_NOT_FOUND");
}