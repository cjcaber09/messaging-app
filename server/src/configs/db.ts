import { Pool } from "pg";
import dotenv from "dotenv"
dotenv.config();

const staticConfig = process.env;

const pool = new Pool({
    host: staticConfig.DB_HOST,
    user: staticConfig.DB_USER,
    password: staticConfig.DB_PASSWORD,
    database: staticConfig.DB_NAME,
    port: parseInt(staticConfig.DB_PORT || "5432")
})

pool.connect();

export default pool;