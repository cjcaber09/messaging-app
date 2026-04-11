import { useDispatch, useSelector } from "react-redux";
import type { messageTypes } from "../../types/messages.types";
import { useState, useRef, useEffect } from "react";
import { MessagesAPI } from "../../api/messages.api";
import type { RootState } from "../../store";
import { loadMessages } from "../../features/messagesSlice";

export default function MessageMenu({
  message,
  isLast,
}: {
  message: messageTypes;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const dispatch = useDispatch();
  const api = MessagesAPI;
  const conversation = useSelector(
    (state: RootState) => state.conversations.conversation,
  );
  const deleteMessage = async (message: messageTypes) => {
    await api.softDeleteMessage({ id: message.id });
    if (!conversation) return;
    const messages = await api.fetchMessageByConvId({ id: conversation?.id });
    dispatch(loadMessages(messages.data));
    setOpen(false);
  };

  return (
    <div className="self-center relative" ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="mx-3 rounded-full bg-white/20 h-5 w-5 flex items-center justify-center "
      >
        ...
      </button>

      {open && (
        <div
          className={`absolute ml-6 z-50 w-40 flex flex-col
            bg-white text-gray-500 text-sm rounded-md shadow-lg
            overflow-hidden p-2
            ${isLast ? "bottom-0" : "top-0"}
          `}
        >
          <button className="text-left px-2 py-1 hover:bg-gray-100">
            Reply
          </button>
          <button
            className="text-left px-2 py-1 hover:bg-red-100 text-red-500"
            onClick={() => deleteMessage(message)}
          >
            Delete
          </button>
          <button className="text-left px-2 py-1 hover:bg-gray-100">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
