import { messageCreate, messageId } from "../types/messages.types";
import pool from "../configs/db";
import { conversationIdType } from "../types/conversations.type";
export const storeMessage = async (messagesData: messageCreate) => {
  try {
    const entries = Object.entries(messagesData);
    const column = entries.map(([key]) => key);
    const values = entries.map(([_, val]) => val);
    const placeholder = values.map((_, index) => `$${index + 1}`);
    const query = `INSERT INTO messages (${column.join(",")}) Values (${placeholder.join(",")}) RETURNING *`;
    const { rows } = await pool.query(query, values);
    return rows.length > 0 ? rows : false;
  } catch (error) {
    throw error;
  }
};

export const fetchMessages = async (conversation_id: conversationIdType) => {
  try {
    const query = `
  SELECT 
    m.*,
    c.id AS conversation_id,
    c.conversation_name,

    -- aggregate reply as JSON object if reply_to_id exists
    CASE 
      WHEN m.parent_id IS NOT NULL THEN
        jsonb_build_object(
          'id',         rm.id,
          'content',    rm.content,
          'sender_id',  rm.sender_id,
          'created_at', rm.created_at
        )
      ELSE NULL
    END AS reply
  FROM messages m
  JOIN conversations c 
    ON m.conversation_id = c.id
  LEFT JOIN messages rm 
    ON m.parent_id = rm.id
  WHERE m.conversation_id = $1::uuid
  ORDER BY m.created_at ASC;
`;
    const { rows } = await pool.query(query, [conversation_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const softDeleteById = async ({
  id,
  sender_id,
}: {
  id: string;
  sender_id: string;
}) => {
  try {
    const query = `UPDATE messages SET deleted_at = NOW() WHERE id=$1 AND sender_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [id, sender_id]);
    if (rows.length <= 0) return false;
    return rows;
  } catch (error) {
    throw error;
  }
};
