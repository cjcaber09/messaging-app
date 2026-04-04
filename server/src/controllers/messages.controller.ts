import { Request, Response } from "express";
import { BodyRequest } from "../types/express";
import { messageCreate } from "../types/messages.types";
import { storeMessage } from "../models/messages.model";
import { sendError, sendSuccessResponse } from "../utils/utils";
import { getConversationById } from "../models/conversations.model";
export const sendMessage = async (
  req: BodyRequest<messageCreate>,
  res: Response,
) => {
  const { conversation_id, parent_id, content, message_type, status } =
    req.body;
  const sender_id = req.user.id;
  const hasConversation = await getConversationById({ id: conversation_id });
  if (!hasConversation) sendError(res, [], "No current Conversation ");

  const message = await storeMessage({
    conversation_id,
    sender_id,
    content,
    parent_id,
    message_type,
    status,
  });

  sendSuccessResponse(res, message, 200);
};

export const getMessages = (req: Request, res: Response) => {
  //
};

export const editMessage = (req: Request, res: Response) => {
  //
};

export const deleteMessage = (req: Request, res: Response) => {
  //
};
