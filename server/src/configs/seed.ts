import pool from "./db";
import usersMigration from "./migrations/users.migration"
import conversationMigration from "./migrations/conversations.migration"
import groupSchema from "./migrations/groups.migration";
import messageSchema from "./migrations/messages.migration";
import conversationMemberSchema from "./migrations/conversation_members.migration";

const seed = async () => {
    const client = await pool.connect();
    try {
        await client.query(usersMigration);
        console.log("users table Created")
        await client.query(conversationMigration);
        console.log("Conversations table created.")
        await pool.query(groupSchema);
        console.log("Group table Created")
        await pool.query(messageSchema);
        console.log("Messages Table created")
        await pool.query(conversationMemberSchema);
        console.log("Conversation Members Table created")

    } catch (error) {
        throw error;
    }
    finally {
        pool.end();
        process.exit();
    }
}


seed();