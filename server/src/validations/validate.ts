import { ObjectSchema } from "joi";
import { userValidation } from "./users.validations";
import { NextFunction, Request, Response } from "express";


const validate = (schema: ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res
                .status(400)
                .json({ message: error?.details?.[0]?.message ?? "Validation error" });
        }
        next();
    }
}

export const validateRegister = validate(userValidation);