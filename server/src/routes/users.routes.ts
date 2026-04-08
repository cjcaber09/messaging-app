import express from "express";
import {
  getUsers,
  createUser,
  loginUser,
  authUser,
} from "../controllers/users.controller";
import { validateLogin, validateRegister } from "../validations/validate";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
const router = express.Router();

router.get("/", AuthenticateUser, getUsers);
router.post("/register", validateRegister, createUser);
router.post("/login", validateLogin, loginUser);
router.get("/refresh", AuthenticateUser, authUser);

export default router;