export default function MessageBubble({ direction }: { direction: string }) {
    if (!direction) return;
    const styling = {
        backGround: direction == "to" ? "rgba(126, 241, 170, 0.15)" : "rgba(36, 204, 247, 0.54)",
        raduis: direction == "to" ? `rounded-br-2xl` : `rounded-bl-2xl`

    }
    return (
        <>
            <div className={`message-bubble ${direction}-sender rounded-t-2xl ${styling.raduis}`}
                style={{ background: styling.backGround }}>
                Lorem Ipsum is simply dummy text of the printing and specimen book.
            </div>
        </>
    )
}