import express from "express";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
import {
  createConversation,
  fetchConversations,
} from "../controllers/conversations.controller";
import { fetchMembers } from "../controllers/conversation_members.controller";

const router = express.Router();

router.get("/", AuthenticateUser, fetchConversations);
router.post("/create", AuthenticateUser, createConversation);
router.get("/members", AuthenticateUser, fetchMembers);

export default router;
