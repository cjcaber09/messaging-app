import { client } from "./client";

export const ConversationAPI = {
  fetchConversation: async () => client.get("/conversations"),
};
