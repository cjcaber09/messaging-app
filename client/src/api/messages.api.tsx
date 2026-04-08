import type { conversationIdType } from "../types/conversations.types";
import { client } from "./client";

export const MessagesAPI = {
  fetchMessageByConvId: async (convId: conversationIdType) =>
    client.get(`/messages/${convId?.id}`),
};
