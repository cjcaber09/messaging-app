import { UseAuth } from "../../context/authProvider";

export default function Header() {
  const { user } = UseAuth(); // ✅ typed user
  return (
    <div className="container py-6 px-4 mt-4 text-left flex flex-row min-w-full justify-between">
      <div className="self-center">
        <h2>Messaging app</h2>
      </div>
      <div className="avatar flex flex-row gap-4">
        <div className="flex justify-center flex-col text-right">
          <span className="name">{user ? user.username : "Loading..."}</span>
          <span className="text-xs">{user ? user.email : <></>}</span>
        </div>
        <div className="img-placeholder"></div>
      </div>
    </div>
  );
}
