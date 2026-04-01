import pool from '../configs/db';
import { UserRegisterType, UserEmail } from '../types/users.types'

export const RegisterUserModel = (userData: UserRegisterType) => {
    // Identify if there is user
}

export const GetUserByEmailModel = async (id: UserEmail) => {
    try {
        const query = "SELECT * FROM users WHERE email = $1";
        const results = await pool.query(query, [id]);
        console.log(results);
        return results.rows;
    } catch (error) {
        throw error;
    }
}