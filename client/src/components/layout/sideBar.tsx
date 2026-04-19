import { useEffect, useState } from "react";
import { ConversationAPI as api } from "../../api/conversations.api";
import { Contacts } from "../Contacts";
import { conversationSchema, type conversationSchemaData, type conversationsWithMembersType, type createConversationType } from "../../types/conversations.types";
import Person from "../../assets/Person.svg?react";
import PersonTeam from "../../assets/Person-team.svg?react";
import Modal from "../ui/Modal";
import { createPortal } from "react-dom";
import { Input } from "../ui/Input";
import { useForm } from "react-hook-form";
import TagInput from "../ui/TagInput";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";

export default function Sidebar() {
  const [conversationList, setConversationList] = useState<
    conversationsWithMembersType[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  function fetchConversations() {
    api.fetchConversation().then((res) => {
      const convData = res.data;
      setConversationList(convData.data);
    });
  }

  useEffect(() => {

    fetchConversations();
  }, []);

  return (
    <div className="container max-w-[400px] max-h-[70svh] sidebar flex flex-col">
      <div className="inbox-header border-b-1 pb-4 border-white/10">Inbox</div>
      <div className="contacts mx-4 overflow-y-auto">
        {conversationList.length > 0 ? (
          <Contacts data={conversationList} />
        ) : (
          <div className="mt-20">
            <span className="mt-20">No Conversation history</span>
          </div>
        )}
      </div>
      <div className="flex gap-2 justify-center mt-auto">
        <button className="btn btn-primary flex flex-col " onClick={() => setShowModal(!showModal)}>
          <Person className="w-4 h-4 " fill="#ffffff" />
          <p>Direct Message</p>
        </button>
        <button className="btn btn-primary flex flex-col disabled">
          <PersonTeam className="w-4 h-4 " fill="#ffffff" />
          <p>Group Message</p>
        </button>
      </div>
      {showModal &&
        createPortal(
          <Modal ModalBody={
            <CreateConv
              closeModal={() => setShowModal(false)}
              updateList={() => fetchConversations()} />
          }
            onClose={() => setShowModal(false)}>
          </Modal>, document.body)}
    </div>
  );
}

export const CreateConv = ({ closeModal, updateList }: { closeModal: () => void; updateList: () => void }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<conversationSchemaData>({
    resolver: zodResolver(conversationSchema),
  });

  const [tagErrors, setTagErrors] = useState("");
  const sendMessage = (data: createConversationType) => {
    if (data.members.length === 0) {
      setTagErrors("At least one member is required");
      return;
    }
    api.createConversation(data).then((res) => {
      if (res.success) {
        setTagErrors("");
        updateList();
        closeModal();
      }
    }).catch((err) => {
      setTagErrors(err.response.data.message || "An error occurred");
    });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(sendMessage)}>
          <div className="mt-4">
            <TagInput
              name="members"
              control={control}
              placeholder="example1@gmail.com, example2@gmail.com"
            ></TagInput>
            {tagErrors && <p className="text-xs text-red-900">{tagErrors}</p>}
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
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
        </form>
      </div>
    </>
  );
};