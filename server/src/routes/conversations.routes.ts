import express from "express";
import { AuthenticateUser } from "../middlewares/authentication.middleware";
import { createConversation } from "../controllers/conversations.controller";

const router = express.Router();

router.post("/create", AuthenticateUser, createConversation);

export default router;
