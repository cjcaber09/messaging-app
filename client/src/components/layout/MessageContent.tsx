import Person from "../../assets/Person.svg?react";
import PersonTeam from "../../assets/Person-team.svg?react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useEffect, useRef } from "react";
import { MessagesAPI } from "../../api/messages.api";
import { loadMessages } from "../../features/messagesSlice";
import MessageBubble from "../ui/MessageBubble";
import { UseAuth } from "../../context/authProvider";
import {
  messageSchema,
  type MessageForm,
  type sendMessageTypes,
} from "../../types/messages.types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";

export default function MessageContent() {
  const { user } = UseAuth();
  const conversation = useSelector(
    (state: RootState) => state.conversations.conversation,
  );
  const messages = useSelector((state: RootState) => state.messages.messages);
  
  const dispatch = useDispatch();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      if (!conversation) return;
      const id = conversation.id;
      const messages = await MessagesAPI.fetchMessageByConvId({
        id,
      });
      dispatch(loadMessages(messages.data));
    })();
  }, [conversation, dispatch]);
  setTimeout(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, 200);
  // zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageForm>({
    mode: "onSubmit",
    resolver: zodResolver(messageSchema),
  });

  // forms
  const formSubmit = async (message: MessageForm) => {
    if (!conversation) return;
    if (!message.content) return;
    const conversationId = conversation.id;
    const data: sendMessageTypes = {
      ...message,
      message_type: "text",
      conversation_id: conversationId,
    };
    await MessagesAPI.sendMessage(data);
    const messages = await MessagesAPI.fetchMessageByConvId({
      id: conversationId,
    });
    dispatch(loadMessages(messages.data));
    reset();
  };
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
            <div className="messages relative overflow-auto my-4 flex-1 content-end">
              {messages.length > 0 && user !== null
                ? messages.map((a, index) => {
                    return (
                      <MessageBubble
                        direction={
                          user.id === a.sender_id ? "sending" : "receiving"
                        }
                        message={a}
                        isDeleted={!a.deleted_at ? false : true}
                        key={a.id}
                        isLast={index === messages.length - 1 ? true : false}
                      ></MessageBubble>
                    );
                  })
                : "start a conversation"}
              <div ref={bottomRef} />
            </div>

            <div className="message-actions ">
              <form
                className="flex-1 flex flex-row"
                onSubmit={handleSubmit(formSubmit)}
              >
                <div className="message-input flex-1 mr-4">
                  <Input
                    name="content"
                    register={register}
                    placeholder="Enter your message here"
                    label=""
                    type="textarea"
                    errors={errors}
                    eventHandle={handleSubmit(formSubmit)}
                  ></Input>
                </div>
                <div className="message-button ml-auto mb-1">
                  <button type="submit" className="btn-primary btn h-full">
                    Submit
                  </button>
                </div>
              </form>
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
