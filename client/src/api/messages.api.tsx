import type { conversationIdType } from "../types/conversations.types";
import { client } from "./client";
import type { messageTypes, sendMessageTypes } from "../types/messages.types";


export const MessagesAPI = {
  fetchMessageByConvId: async (convId: conversationIdType) =>
    client.get(`/messages/${convId?.id}`).then((res) => res.data),
  sendMessage: async (data: sendMessageTypes) =>
    client.post("/messages/send", data),
  softDeleteMessage: async (messageId: Pick<messageTypes, "id">) =>
    client.delete(`messages/${messageId.id}`).then((res) => res.data),
};
