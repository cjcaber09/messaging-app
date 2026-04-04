import { ObjectSchema } from "joi";
import { userLoginValidation, userValidation } from "./users.validations";
import { conversationsValidation } from "./conversations.validation";
import { NextFunction, Request, Response } from "express";
import { messageValidation } from "./messages.validation";

const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ message: error?.details?.[0]?.message ?? "Validation error" });
    }
    next();
  };
};

export const validateRegister = validate(userValidation);
export const validateLogin = validate(userLoginValidation);

// Conversations
export const validateConversation = validate(conversationsValidation);
// messages
export const validateMessages = validate(messageValidation);