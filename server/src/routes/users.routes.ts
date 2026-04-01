import express from "express";
import { getUsers, createUser } from "../controllers/users.controller";
import { validateRegister } from "../validations/validate";
const router = express.Router();

router.get("/", getUsers);
router.post("/register", validateRegister, createUser);

export default router;