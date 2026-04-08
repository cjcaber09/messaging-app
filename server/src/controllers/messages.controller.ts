import { Request, Response } from "express";
import { sendError, sendSuccessResponse } from "../utils/utils";
// types
import { BodyRequest, ParamRequest } from "../types/express";
import { conversationIdType } from "../types/conversations.type";
import { messageCreate } from "../types/messages.types";
// models
import { storeMessage, fetchMessages } from "../models/messages.model";
import { getConversationById } from "../models/conversations.model";
import { checkIfIncluded } from "../models/conversation_member.model";
export const sendMessage = async (
  req: BodyRequest<messageCreate>,
  res: Response,
) => {
  const { conversation_id, parent_id, content, message_type } = req.body;
  const sender_id = req.user.id;
  console.log(req.user);
  const hasConversation = await getConversationById(conversation_id);
  if (!hasConversation) sendError(res, [], "No current Conversation ");
  const message = await storeMessage({
    conversation_id,
    sender_id,
    content,
    parent_id,
    message_type,
  });

  sendSuccessResponse(res, message, 200);
};

export const getMessages = async (
  req: ParamRequest<conversationIdType>,
  res: Response,
) => {
  let { conversation_id } = req.params;
  // check inclusivity
  let user_id = req.user.id;
  const isIncluded = await checkIfIncluded({ conversation_id, user_id });
  if (!isIncluded)
    sendError(
      res,
      "unauthorized",
      "You are not authorized to access this messages",
    );
  const hasConversation = await getConversationById(conversation_id);
  if (!hasConversation) sendError(res, [], "No current Conversation ");
  const messages = await fetchMessages(conversation_id);
  // message response
  sendSuccessResponse(res, messages, 200);
};

export const editMessage = (req: Request, res: Response) => {
  //
};

export const deleteMessage = (req: Request, res: Response) => {
  //
};
