export default function Header() {
    return (
        <div className="container py-6 px-4 mt-4 text-left flex flex-row justify-between">
            <div>
                <h2>Messaging app</h2>
            </div>
            <div className="avatar flex flex-row gap-4">
                <div className="flex flex-col text-right">
                    <span className="name">Carl John Caber</span>
                    <span>Friend ID: 123014</span>
                </div>
                <div className="img-placeholder"></div>
            </div>
        </div>
    )
}
