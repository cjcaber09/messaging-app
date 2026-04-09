export default function MessageBubble({
  direction,
  content,
}: {
  direction: string;
  content: string;
}) {
  if (!direction) return;
  const styling = {
    backGround:
      direction == "sending"
        ? "rgba(126, 241, 170, 0.15)"
        : "rgba(36, 204, 247, 0.54)",
    // raduis: direction == "sending" ? `rounded-br-full` : `rounded-bl-full`,
  };
  return (
    <>
      <div
        className={`message-bubble ${direction}-direction rounded-xl mt-1 whitespace-pre-wrap`}
        style={{ background: styling.backGround }}
      >
        <p className="text-sm">{content}</p>
      </div>
    </>
  );
}
