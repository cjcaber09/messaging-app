import { Request, Response } from "express";
import { sendError, sendSuccessResponse } from "../utils/utils";
import {
  CheckConversation,
  StoreConversation,
} from "../models/conversations.model";

export const createConversation = async (req: Request, res: Response) => {
  let type = "direct";
  let { sender_id, members } = req.body;
  if (members.length > 1) type = "group";
  //   check if the conversation exist.
  // create Conversation.
  if (!members.some((m: any) => m.user_id === sender_id)) {
    members.push({ user_id: sender_id });
  }
  const exist = await CheckConversation(members);
  if (exist) sendError(res, [], "Conversation already exist.", 404);
  const conversation = await StoreConversation(type, members);
  sendSuccessResponse(res, conversation);
};
