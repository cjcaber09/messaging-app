export interface MembersTypes {
  id: string;
  conversation_id: string;
  user_id: string;
  role: string;
  joined_at: Date;
  left_at: Date;
}

export type checkInclusivity = Pick<
  MembersTypes,
  "conversation_id" | "user_id"
>;