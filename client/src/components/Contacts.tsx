import { useDispatch } from "react-redux";
import { setActiveConversation } from "../features/conversationsSlice";
import type { conversationsWithMembersType } from "../types/conversations.types";

export function Contacts({ data }: { data: conversationsWithMembersType[] }) {
  const dispatch = useDispatch();

  const changeConv = (convId: conversationsWithMembersType) => {
    dispatch(setActiveConversation(convId));
  };
  return (
    <div>
      {data.map((a) => {
        return (
          <div
            className="inbox-people"
            key={a.id}
            onClick={() => changeConv(a)}
          >
            <div className="img-placeholder"></div>
            <div className="contact-details">
              <div className="contact-name">
                <h3>
                  {a.members.length == 1
                    ? a.members[0].firstname + " " + a.members[0].lastname
                    : "group"}{" "}
                </h3>
              </div>
              <div className="contact-id">
                <h6>{a.members.length == 1 ? a.members[0].email : ""} </h6>
              </div>
            </div>
            <div className="contact-actions"></div>
          </div>
        );
      })}
    </div>
  );
}
