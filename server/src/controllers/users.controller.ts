import { AuthRequest, BodyRequest, QueryRequest } from "../types/express";
import { request, Response } from "express";
import { UserRegisterType, UserAuthType } from "../types/users.types";
import { GetUserByEmailModel, StoreUserModel } from "../models/users.model";
import bcrypt from "bcryptjs";
import { generateToken, removePassword } from "../utils/utils";

export const getUsers = async (req: QueryRequest<{}>, res: Response) => {
  // Get the data,
  res.status(400).send("HELLO");
};

export const loginUser = async (
  req: BodyRequest<UserAuthType>,
  res: Response,
) => {
  // GET the user
  let { username, email, password } = req.body;
  const found = await GetUserByEmailModel(
    email ? { email } : { username: username! },
  );
  if (!found)
    return res.status(403).send("Email or username password didnot match.");
  //   Login and create a token
  let signed = bcrypt.compare(password, found.password);
  if (!signed) return res.status(403).send("Invalid email or password.");
  const token = await generateToken(found);
  // Set token
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.status(200).send({ user: removePassword(found), token });
};

export const createUser = async (
  req: BodyRequest<UserRegisterType>,
  res: Response,
) => {
  // Data is already clean, Proceed to saving data.
  let { email, username } = req.body;
  const emailExist = await GetUserByEmailModel(
    email ? { email } : { username: username! },
  );
  if (emailExist) res.status(403).send("Email already exist!");
  // create/store Email
  let { password, lastname, firstname, is_active } = req.body;
  //   encrypt the password
  password = await bcrypt.hash(password, 10);
  const stored = await StoreUserModel({
    password,
    email,
    username,
    lastname,
    firstname,
    is_active,
  });
  const token = await generateToken(stored);
  // Set token
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.send({ user: stored, token });
};

export const authUser = async (req: AuthRequest, res: Response) => {
  const token = req.cookies.token;
};
