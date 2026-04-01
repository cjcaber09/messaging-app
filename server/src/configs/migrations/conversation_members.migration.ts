const conversationMemberSchema = `
DROP TYPE IF EXISTS role_type CASCADE;
CREATE TYPE role_type as ENUM('admin','member');
CREATE TABLE IF NOT EXISTS conversation_members (
id  uuid primary key not null default gen_random_uuid(), 
conversation_id uuid NOT NULL References conversations(id) ON DELETE CASCADE, 
user_id uuid NOT NULL references users(id) ON DELETE CASCADE, 
role role_type NOT NULL DEFAULT 'admin', 
joined_at timestamptz NOT NULL DEFAULT NOW(), 
left_at timestamptz NOT NULL DEFAULT NOW()
);
DROP INDEX IF EXISTS idx_cm_conversation_id;
DROP INDEX IF EXISTS idx_cm_user_id;
CREATE INDEX idx_cm_conversation_id on conversations (id);
CREATE INDEX idx_cm_user_id on users (id);
`;

export default conversationMemberSchema;