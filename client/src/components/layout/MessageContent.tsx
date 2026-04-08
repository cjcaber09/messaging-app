import Person from "../../assets/Person.svg?react";
import PersonTeam from "../../assets/Person-team.svg?react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { MessagesAPI } from "../../api/messages.api";
import { loadMessages } from "../../features/messagesSlice";
import MessageBubble from "../ui/MessageBubble";
import { UseAuth } from "../../context/authProvider";
export default function MessageContent() {
  const { user } = UseAuth();
  const conversation = useSelector(
    (state: RootState) => state.conversations.conversation,
  );
  const messages = useSelector((state: RootState) => state.messages.messages);

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      if (!conversation) return;
      const id = conversation.id;
      const messages = await MessagesAPI.fetchMessageByConvId({
        id,
      }).then((res) => res.data);
      dispatch(loadMessages(messages.data));
    })();
    console.log(conversation);
  }, [conversation, dispatch]);
  return (
    <>
      <div className="container message-content flex flex-col flex-1 px-4">
        {conversation !== null ? (
          <>
            <div className="message-header">
              <div className="img-placeholder"></div>
              <div className="conversation-details text-left">
                {conversation.members.length < 2 ? (
                  <>
                    <div className="name">
                      {conversation.members[0].firstname +
                        " " +
                        conversation.members[0].lastname}
                    </div>
                    <small>{conversation.members[0].id}</small>
                  </>
                ) : (
                  "test"
                )}
              </div>
              <div className="spacer my-4"></div>
            </div>
            <div className="messages overflow-y-auto my-4 flex-1 content-end">
              {messages.length >= 0 && user !== null
                ? messages.map((a) => {
                    return (
                      <MessageBubble
                        direction={
                          user.id === a.sender_id ? "receiving" : "sending"
                        }
                        content={a.content}
                        key={a.id}
                      ></MessageBubble>
                    );
                  })
                : "start a conversation"}
            </div>

            <div className="message-actions ">
              <div className="message-input flex-1 ">
                <input
                  type="text"
                  placeholder="Type your Message Here."
                  id="message"
                  className="w-full"
                />
              </div>
              <div className="message-button ml-auto">
                <button className="btn-primary btn">TEST</button>
              </div>
            </div>
          </>
        ) : (
          <div className="message-board">
            <h2>No messages available.</h2>
            <h6>Start a Direct message or create a chat group</h6>
            <div className="flex gap-2 justify-center">
              <button className="btn btn-primary flex flex-col ">
                <Person className="w-4 h-4 " fill="#ffffff" />
                <p>Direct Message</p>
              </button>
              <button className="btn btn-primary flex flex-col disabled">
                <PersonTeam className="w-4 h-4 " fill="#ffffff" />
                <p>Group Message</p>
              </button>
            </div>
            <h6>or select a contact on the inbox panel</h6>
          </div>
        )}
      </div>
    </>
  );
}
