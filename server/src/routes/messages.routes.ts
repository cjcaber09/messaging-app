import express from "express";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
import {
  deleteMessage,
  getMessages,
  sendMessage,
} from "../controllers/messages.controller";
import { validateMessages } from "../validations/validate";

const router = express.Router();

router.post("/send", AuthenticateUser, validateMessages, sendMessage);
router.get("/:conversation_id", AuthenticateUser, getMessages);
router.delete("/:message_id", AuthenticateUser, deleteMessage);

export default router;
