import { useEffect, useState } from "react";
import { ConversationAPI as api } from "../../api/conversations.api";
import { Contacts } from "../Contacts";
import type { conversationsWithMembersType } from "../../types/conversations.types";
export default function Sidebar() {
  const [conversations, setConversations] = useState<
    conversationsWithMembersType[]
  >([]);
  useEffect(() => {
    function fetchConversations() {
      api.fetchConversation().then((res) => {
        const convData = res.data;
        setConversations(convData.data);
      });
    }
    fetchConversations();
  }, []);

  return (
    <div className="container max-w-[400px] sidebar">
      <div className="inbox-header border-b-1 pb-4 border-white/10">Inbox</div>
      <div className="contacts mx-4">
        {conversations.length > 0 ? (
          <Contacts data={conversations} />
        ) : (
          <div className="mt-20">
            <span className="mt-20">No Conversation history</span>
          </div>
        )}
      </div>
    </div>
  );
}
