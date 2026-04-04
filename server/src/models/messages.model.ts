import { messageCreate } from "../types/messages.types";

export const storeMessage = async (messagesData: messageCreate) => {
  //
  const keys = Object.keys(messagesData);
  const val = Object.values(messagesData);
  console.log({ keys, val });
  const query = `INSERT INTO messages `;
};
