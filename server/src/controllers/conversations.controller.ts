import { Request, Response } from "express";
import { sendError, sendSuccessResponse } from "../utils/utils";
import {
  CheckConversation,
  StoreConversation,
} from "../models/conversations.model";
import { fetchUserConversations } from "../models/conversation_member.model";
import { GetUserByEmailModel } from "../models/users.model";
import { UserEmail } from "../types/users.types";
import { storeMessage } from "../models/messages.model";

export const createConversation = async (req: Request, res: Response) => {
  let type = "direct";
  let sender_id: string | undefined = undefined;
  let { members, message } = req.body;
  //   check if the conversation exist.
  // create Conversation.
  // instead of Id use email
  // if userId is set prioritize it
  if (req.user.id) sender_id = req.user.id;
  if (!sender_id) return sendError(res, [], "Unauthorized", 401);
  let membersArr: any = [];
  await Promise.all(
    members.map(async (a: UserEmail) => {
      const user = await GetUserByEmailModel(a);
      if (!user) {
        return sendError(res, [], `User with email ${a.email} not found.`, 404);
      }
      membersArr.push({ user_id: user.id });
    }),
  );
  if (!membersArr.some((m: any) => m.user_id === sender_id)) {
    membersArr.push({ user_id: sender_id });
  }
  if (membersArr.length > 2) type = "group";
  const exist = await CheckConversation(membersArr);
  if (exist) return sendError(res, [], "Conversation already exist.", 404);
  const conversation = await StoreConversation(type, membersArr);
  if (message && conversation) await storeMessage({
    conversation_id: conversation.id,
    sender_id,
    parent_id: null,
    content: message,
    message_type: "text",
  });
  sendSuccessResponse(res, []);
};;

export const fetchConversations = async (req: Request, res: Response) => {
  const { user } = req;
  const conversations = await fetchUserConversations(user.id);
  sendSuccessResponse(res, conversations, 200);
};

