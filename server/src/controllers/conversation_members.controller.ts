import { Request, Response } from "express";
import { fetchConvMembers } from "../models/conversation_member.model";
import { sendError, sendSuccessResponse } from "../utils/utils";

export const fetchMembers = async (req: Request, res: Response) => {
  let { conversation_id } = req.query;
  if (typeof conversation_id !== "string") return sendError(res, "Error");
  const members = await fetchConvMembers(conversation_id);
  sendSuccessResponse(res, members, 200);
};
