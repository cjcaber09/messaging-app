import MessageBubble from "../ui/messageBubble";

export default function MessageContent() {
    return (
      <>
        <div className="container message-content flex-1">
          <div className="message-header flex flex-row gap-4">
            <div className="img-placeholder"></div>
            <div className="conversation-details text-left">
              <div className="name">John Doe</div>
              <small>Friend ID: 12314</small>
            </div>
          </div>
          <hr className="spacer" />
          <div className="messages overflow-y-auto">
            <MessageBubble direction="to" />
            <MessageBubble direction="from" />
            <MessageBubble direction="to" />
            <MessageBubble direction="to" />
            <MessageBubble direction="from" />
          </div>
          <div className="spacer"></div>
          <div className="message-actions flex flex-row gap-4">
            <div
              className="message-input flex-1    '
                    "
            >
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
        </div>
      </>
    );
}