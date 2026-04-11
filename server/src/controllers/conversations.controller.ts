import { Request, Response } from "express";
import { sendError, sendSuccessResponse } from "../utils/utils";
import {
  CheckConversation,
  StoreConversation,
} from "../models/conversations.model";
import { fetchUserConversations } from "../models/conversation_member.model";
import { GetUserByEmailModel } from "../models/users.model";
import { UserEmail } from "../types/users.types";

export const createConversation = async (req: Request, res: Response) => {
  let type = "direct";
  let { sender_id, members } = req.body;
  //   check if the conversation exist.
  // create Conversation.
  // instead of Id use email
  // if userId is set prioritize it
  if (req.user.id) sender_id = req.user.id;
  let membersArr: any = [];
  await Promise.all(
    members.map(async (a: UserEmail) => {
      const user = await GetUserByEmailModel(a);
      membersArr.push({ user_id: user.id });
    }),
  );
  if (!membersArr.some((m: any) => m.user_id === sender_id)) {
    membersArr.push({ user_id: sender_id });
  }
  if (membersArr.length > 1) type = "group";
  const exist = await CheckConversation(membersArr);
  if (exist) sendError(res, [], "Conversation already exist.", 404);
  const conversation = await StoreConversation(type, membersArr);
  sendSuccessResponse(res, conversation);
};;

export const fetchConversations = async (req: Request, res: Response) => {
  const { user } = req;
  const conversations = await fetchUserConversations(user.id);
  sendSuccessResponse(res, conversations, 200);
};