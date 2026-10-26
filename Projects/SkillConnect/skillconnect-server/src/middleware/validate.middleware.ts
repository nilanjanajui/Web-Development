import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { sendError } from "../utils/apiResponse";

export function validate(schema: AnyZodObject) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (err) {
            if (err instanceof ZodError) {
                const message = err.errors
                    .map((e) => `${e.path.join(".")}: ${e.message}`)
                    .join("; ");
                return sendError(res, 422, message, "VALIDATION_ERROR");
            }
            next(err);
        }
    };
}