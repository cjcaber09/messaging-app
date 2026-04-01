const conversationSchema = `
DROP TYPE IF EXISTS conversation_type CASCADE;
CREATE TYPE conversation_type as ENUM ('direct','group');

Create TABLE IF NOT EXISTS conversations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type conversation_type NOT NULL DEFAULT 'direct',
    created_at timestamptz NOT NULL DEFAULT NOW()
);
DROP INDEX IF EXISTS idx_conversation_id;
CREATE INDEX idx_conversation_id ON conversations(id);
`;

export default conversationSchema;