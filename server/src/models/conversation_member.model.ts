import pool from "../configs/db";
import { checkInclusivity } from "../types/conversation_members.types";
import {
  conversationIdType,
  conversationTypes,
} from "../types/conversations.type";
import { UserId } from "../types/users.types";

// export const StoreConversationMember = async (
//   con_id: string,
//   members: MembersTypes[],
// ) => {

// };

export const checkIfIncluded = async (data: checkInclusivity) => {
  const query = `SELECT * FROM conversation_members WHERE conversation_id = $1 AND user_id = $2`;
  const { rows } = await pool.query(query, [
    data.conversation_id,
    data.user_id,
  ]);
  return rows.length > 0 ? rows : false;
};

export const fetchUserConversations = async (user: UserId) => {
  try {
    const query = `SELECT c.*, json_agg(
    json_build_object(
    'id',u.id,
    'firstname',u.firstname,
    'lastname',u.lastname,
    'email',u.email)
    ) as members
     FROM conversations c
     JOIN conversation_members cm
     ON c.id = cm.conversation_id
     JOIN users u
     ON u.id = cm.user_id
     WHERE c.id IN (
        SELECT conversation_id
        FROM conversation_members
        WHERE user_id = $1::uuid AND u.id != $1::uuid
     )
     GROUP BY c.id;
    `;
    const { rows } = await pool.query<conversationTypes>(query, [user]);
    return rows;
  } catch (error) {
    throw error;
  }
};

export const fetchConvMembers = async (conversation_id: conversationIdType) => {
  const query = `SELECT * FROM conversation_members WHERE conversation_id = $1::uuid`;
  const { rows } = await pool.query(query, [conversation_id]);
  return rows;
};
