export interface conversationTypes {
  id: string;
  conversation_name: string;
  type: "direct" | "group";
  created_at: Date;
}

export type conversationIdType = Pick<conversationTypes, "id">;
