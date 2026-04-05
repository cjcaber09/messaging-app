import pool from "../configs/db";
import { checkInclusivity } from "../types/conversation_members.types";
import { conversationIdType } from "../types/conversations.type";

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
  console.log(rows);
  return rows.length > 0 ? rows : false;
};

export const fetchConvMembers = async (conversation_id: conversationIdType) => {
  const query = `SELECT * FROM conversation_members WHERE conversation_id = $1::uuid`;
  const { rows } = await pool.query(query, [conversation_id]);
  return rows;
};
