import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserResponse } from "../types/users.types";
dotenv.config();

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(404).send("Authorization required.");
  try {
    if (!process.env.SECRET_KEY) {
      throw new Error("JWT_SECRET is not defined");
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as UserResponse;
    if (decoded.username && decoded.email) {
      req.user = decoded;
      next();
    }
  } catch (error) {
    throw error;
  }
};
