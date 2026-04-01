const messageSchema = `
  DROP TYPE IF EXISTS message_type CASCADE;
  DROP TYPE IF EXISTS message_status CASCADE;

CREATE TYPE message_type as ENUM('text','image','file','audio');
CREATE TYPE message_status as ENUM('sending','delivered');

CREATE TABLE IF NOT EXISTS messages (
  id              UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID           NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id       UUID           NOT NULL REFERENCES users(id),
  parent_id       UUID           REFERENCES messages(id),        -- reply/thread
  content         TEXT,
  message_type    message_type   NOT NULL DEFAULT 'text',
  status          message_status NOT NULL DEFAULT 'sending',
  is_edited       BOOLEAN        NOT NULL DEFAULT FALSE,
  edited_at       TIMESTAMPTZ,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  deleted_at      TIMESTAMPTZ                            
  );
  DROP INDEX IF EXISTS idx_msg_conversation_id;
  CREATE INDEX idx_msg_conversation_id on conversations(id);
  DROP INDEX IF EXISTS idx_msg_sender_id;
  CREATE INDEX idx_msg_sender_id on users(id);
  DROP INDEX IF EXISTS idx_msg_parent_id;
  CREATE INDEX idx_msg_parent_id on messages(id);
  `;

export default messageSchema;