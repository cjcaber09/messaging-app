import { messageCreate } from "../types/messages.types";
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
    const query = `SELECT m.*,
    c.id as conversation_id,
    c.conversation_name
    FROM messages m
    JOIN conversations c 
        ON m.conversation_id = c.id
    WHERE m.conversation_id = $1::uuid
    ORDER BY m.created_at ASC;`;
    const { rows } = await pool.query(query, [conversation_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};