import pool from "../configs/db";
import { UserRegisterType, UserEmail } from "../types/users.types";
import { removePassword } from "../utils/utils";

export const GetUserByEmailModel = async (whereClause: UserEmail) => {
  try {
    let field = whereClause.email ? "email" : "username";
    let value = whereClause.email ? whereClause.email : whereClause.username;
    const query = `SELECT * FROM users WHERE ${field} = $1`;
    const results = await pool.query(query, [value]);
    let user = results.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
};

export const GetUserByIdModel = async (id: string) => {
  try {
    const query = `SELECT * FROM users WHERE id = $1`;
    const results = await pool.query(query, [id]);
    let user = results.rows[0];
    return user;
  } catch (error) {
    throw error;
  }
};
export const StoreUserModel = async (userData: UserRegisterType) => {
  try {
    // Fields to exclude from INSERT
    const exclude = ["confirm_password", "is_verified"];

    // Filter out excluded fields
    const filtered = Object.entries(userData).filter(
      ([key]) => !exclude.includes(key),
    );

    const columns = filtered.map(([key]) => key);
    const values = filtered.map(([, val]) => val);

    const placeholders = values.map((_, i) => `$${i + 1}`);

    const sql = `INSERT INTO users (${columns.join(", ")}) VALUES (${placeholders.join(", ")}) RETURNING *`;
    const result = await pool.query(sql, values);
    return removePassword(result.rows[0]);
  } catch (error) {
    throw error;
  }
};
