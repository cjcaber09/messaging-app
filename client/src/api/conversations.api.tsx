import type { createConversationType } from "../types/conversations.types";
import { client } from "./client";

export const ConversationAPI = {
  fetchConversation: async () => client.get("/conversations"),
  createConversation: async (data: createConversationType) => client.post("/conversations/create", data).then((res) => res.data),
};
