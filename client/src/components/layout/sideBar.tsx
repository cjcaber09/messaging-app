import { useEffect, useState } from "react";
import { ConversationAPI as api } from "../../api/conversations.api";
import { Contacts } from "../Contacts";
import type { conversationsWithMembersType } from "../../types/conversations.types";
import Person from "../../assets/Person.svg?react";
import PersonTeam from "../../assets/Person-team.svg?react";
import Modal from "../ui/Modal";
import { createPortal } from "react-dom";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
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
    <div className="container max-w-[400px] sidebar flex flex-col">
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
      <div className="flex gap-2 justify-center mt-auto">
        <button className="btn btn-primary flex flex-col ">
          <Person className="w-4 h-4 " fill="#ffffff" />
          <p>Direct Message</p>
        </button>
        <button className="btn btn-primary flex flex-col disabled">
          <PersonTeam className="w-4 h-4 " fill="#ffffff" />
          <p>Group Message</p>
        </button>
      </div>
      {createPortal(<Modal ModalBody={<CreateConv />}></Modal>, document.body)}
    </div>
  );
}

export const CreateConv = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  return (
    <>
      <div>
        <div className="mt-4">
          <Input
            name="emails"
            label="email"
            register={register}
            errors={errors}
            placeholder="example1@gmail.com, example2@gmail.com"
          ></Input>
        </div>
        <div className="mt-4">
          <Input
            name="message"
            label="Message"
            type="textarea"
            register={register}
            errors={errors}
            placeholder="Type your message here"
          ></Input>
        </div>
      </div>
    </>
  );
};