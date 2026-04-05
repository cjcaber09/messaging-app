import express from "express";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
import { createConversation } from "../controllers/conversations.controller";
import { fetchMembers } from "../controllers/conversation_members.controller";

const router = express.Router();

router.post("/create", AuthenticateUser, createConversation);
router.get("/members", AuthenticateUser, fetchMembers);

export default router;
