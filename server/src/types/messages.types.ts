//   id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
//   conversation_id UUID           NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
//   sender_id       UUID           NOT NULL REFERENCES users(id),
//   parent_id       UUID           REFERENCES messages(id),        -- reply/thread
//   content         TEXT,
//   message_type    message_type   NOT NULL DEFAULT 'text',
//   status          message_status NOT NULL DEFAULT 'sending',
//   is_edited       BOOLEAN        NOT NULL DEFAULT FALSE,
//   edited_at       TIMESTAMPTZ,
//   created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
//   deleted_at      TIMESTAMPTZ

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
}

export type messageQuery = Partial<
  Omit<messageTypes, "created_at" | "deleted_at">
>;

export type messageId = Pick<messageTypes, "id">;

export type messageCreate = Omit<
  messageTypes,
  "is_edited" | "edited_at" | "id" | "is_edited" | "deleted_at" | "created_at"
>;
