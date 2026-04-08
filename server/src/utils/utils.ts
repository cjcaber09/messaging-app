import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserResponse, UserTypes } from "../types/users.types";
import { Response } from "express";
dotenv.config();

export const generateToken = async (user: UserResponse) => {
  let { id, username, email, is_active, is_verified } = user;
  const token = jwt.sign(
    { id, username, email, is_active, is_verified },
    process.env.SECRET_KEY!,
  );
  return token;
};

export const removePassword = (userdata: UserTypes) => {
  let { password, ...noPassword } = userdata;
  return noPassword;
};

export const decodeToken = async (token: string) => {
  if (!process.env.SECRET_KEY) throw new Error("test");
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded;
};
export const sendSuccessResponse = (
  res: Response,
  data: any = [],
  status: number = 200,
  message: string = "Success",
) => {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  data: any = null,
  message: string = "Something went wrong",
  status: number = 500,
) => {
  return res.status(status).json({
    error: false,
    message,
    data,
  });
};
