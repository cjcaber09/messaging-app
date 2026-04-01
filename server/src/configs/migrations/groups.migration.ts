const groupSchema = `
CREATE TABLE IF NOT EXISTS groups (
id uuid PRIMARY KEY DEFAULT gen_random_uuid(), 
conversation_id UUID NOT NULL references conversations(id) ON DELETE CASCADE,
name VARCHAR(100) NOT NULL,
description TEXT,
avatar_url TEXT, 
owner_id UUID NOT NULL references users(id) ON DELETE CASCADE,
created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP INDEX IF EXISTS indx_grp_conversation_id;
CREATE INDEX indx_grp_conversation_id on conversations (id);
DROP INDEX IF EXISTS indx_grp_owner_id;
CREATE INDEX indx_grp_owner_id on users (id);
`

export default groupSchema;