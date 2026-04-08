export type conversationsWithMembersType = {
  conversation_name: string;
  created_at: Date;
  id: string;
  members: membersType[];
  type: "direct" | "group";
};

export type membersType = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type conversationIdType = {
  id: string;
} | null;
