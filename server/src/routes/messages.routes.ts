import express from "express";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
import { sendMessage } from "../controllers/messages.controller";
import { validateMessages } from "../validations/validate";

const router = express.Router();

router.post("/send", AuthenticateUser, validateMessages, sendMessage);

export default router;
