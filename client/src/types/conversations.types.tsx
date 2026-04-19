import z from "zod";

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


export type createConversationType = {
  members: { email: string }[],
  message?: string
};

export const conversationSchema = z.object({
  members: z.array(
    z.object({
      email: z.email({ message: "Invalid email" }),
    })
  ),
  message: z.string().optional()
});

export type conversationSchemaData = z.infer<typeof conversationSchema>;