import type { messageTypes } from "../../types/messages.types";
import MessageMenu from "./MessageMenu";
export default function MessageBubble({
  direction,
  message,
  isDeleted,
  isLast,
}: {
  direction: string;
  message: messageTypes;
  isDeleted: boolean;
  isLast: boolean;
}) {
  if (!direction) return;
  const styling = {
    backGround:
      direction == "receiving"
        ? "rgba(126, 241, 170, 0.15)"
        : "rgba(36, 204, 247, 0.54)",
    // raduis: direction == "sending" ? `rounded-br-full` : `rounded-bl-full`,
  };
  {
    console.log(message);
  }

  return (
    <div className={`flex ${direction}-direction text-xs `}>
      {direction == "sending" ? (
        <MessageMenu message={message} isLast={isLast}></MessageMenu>
      ) : (
        ""
      )}
      <div className="mt-1 ">
        {message.reply ? (
          <div className={`message-reply ${direction ? "ml-4" : "mr-4"}`}>
            <div className="bg-white/20 rounded-t-lg rounded-b-none">
              {message.reply.content}
            </div>
          </div>
        ) : (
          ""
        )}

        <div
          className={`message-bubble rounded-xl whitespace-pre-wrap`}
          style={{ background: styling.backGround }}
        >
          <p className={`${isDeleted ? "italic" : ""}`}>
            {!isDeleted ? message.content : "Message deleted"}
          </p>
        </div>
      </div>
      {direction == "receiving" ? (
        <MessageMenu message={message} isLast={isLast}></MessageMenu>
      ) : (
        ""
      )}
    </div>
  );
}
