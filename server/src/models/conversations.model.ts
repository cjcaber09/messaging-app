import pool from "../configs/db";
import { QueryResult } from "pg";
import { conversationIdType } from "../types/conversations.type";
import { MembersTypes } from "../types/conversation_members.types";

export const StoreConversation = async (
  type: string,
  members: MembersTypes[],
) => {
  try {
    await pool.query("BEGIN"); // start transaction

    const ConvQuery =
      "INSERT INTO conversations (type) VALUES ($1) RETURNING *";
    const { rows } = await pool.query(ConvQuery, [type]);

    const valuesPlaceholders = members
      .map((_, idx) => `($1, $${idx + 2})`)
      .join(", ");
    const val = members.map((a) => a.user_id).filter(Boolean);
    const CMQuery = `INSERT INTO conversation_members (conversation_id, user_id) VALUES ${valuesPlaceholders}`;
    const conversation_members = await pool.query(CMQuery, [
      rows[0].id,
      ...val,
    ]);
    await pool.query("COMMIT");
    // return the created conversation with its members
    return { ...rows[0], members: conversation_members.rows };
  } catch (error) {
    await pool.query("ROLLBACK");
    throw error;
  }
};

export const CheckConversation = async (members: MembersTypes[]) => {
  try {
    // start transaction
    // 1. Check if a conversation with the exact same members already exists
    const val = members.map((a) => a.user_id).filter(Boolean);
    const existingQuery = `
    SELECT conversation_id 
    FROM conversation_members
    GROUP BY conversation_id
    HAVING array_agg(user_id ORDER BY user_id) = $1::uuid[]
  `;
    const { rows }: QueryResult = await pool.query(existingQuery, [val.sort()]);
    if (rows.length > 0) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

export const getConversationById = async (id: conversationIdType) => {
  try {
    const query = `SELECT * FROM conversations WHERE id = $1::uuid`;
    const { rows } = await pool.query(query, [id]);
    if (rows.length > 0) {
      return rows;
    } else return false;
  } catch (error) {
    throw error;
  }
};
