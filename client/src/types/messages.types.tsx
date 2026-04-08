export interface messageTypes {
  id: string;
  conversation_id: string;
  sender_id: string;
  parent_id: string;
  content: string;
  message_type: "text" | "image";
  status: string;
  is_edited?: boolean;
  edited_at?: Date;
  created_at?: Date;
  deleted_at?: Date;
  conversation_name: string;
}
