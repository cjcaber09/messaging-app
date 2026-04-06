export default function Sidebar() {
    return (
      <div className="container max-w-[400px] sidebar">
        <div className="inbox-header">Inbox</div>
        {Contacts()}
        {Contacts()}
      </div>
    );

}
function Contacts() {
    return (
        <div className="inbox-people">
            <div className="img-placeholder">

            </div>
            <div className="contact-details">
                <div className="contact-name"><h3>John Doe</h3></div>
                <div className="contact-id"><h6>0913171</h6></div>
            </div>
            <div className="contact-actions">
            </div>
        </div>

    )

}