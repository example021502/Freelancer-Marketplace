import React, { useEffect, useState } from "react";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Label from "../../common/Label";
import { get_user_data } from "../../utils/backend_calls_functions";

function HomeTopPart() {
  const [user, setUser] = useState(null);
  const get_data = async () => {
    const data = await get_user_data();
    setUser(data);
  };

  useEffect(() => {
    get_data();
  }, []);

  return (
    <div className="w-full p-2 rounded-xl bg-gray-200 flex flex-row items-center justify-between">
      <div className="w-80 relative flex">
        <Icon
          icon={"ri-search-line"}
          class_name={
            "absolute top-0 bottom-0 left-2 flex items-center justify-center"
          }
        />
        <Input
          placeholder={"Enter anything to search..."}
          class_name={
            "w-full items-center rounded-xl bg-gray-50 px-2 pl-8 py-1.5 border border-green-800/40 focus:outline-none focus:ring-2 ring-green-800"
          }
        />
      </div>
      <div className="px-2 text-md font-lighter flex-row flex space-x-4">
        {[
          { id: "notification", icon: "ri-notification-line" },
          { id: "message", icon: "ri-message-3-line" },
        ].map((icn) => {
          return (
            <span
              key={icn.id}
              className="bg-gray-50 cursor-pointer transition-all ease-in-out duration-150 hover:scale-[1.05] rounded-full p-2 w-9 h-9 flex items-center justify-center"
            >
              <Icon icon={icn.icon} />
            </span>
          );
        })}
        <div className="flex flex-row items-center justify-start space-x-2">
          <span className="flex items-center w-10 h-10 rounded-full font-lighter text-xl justify-center bg-gray-50">
            <Icon icon={"ri-user-line"} />
          </span>
          <div className="flex text-xs font-semibold items-start justify-start flex-col">
            <Label
              text={`${user?.name} | ${user?.role}` || "Username"}
              class_name={"truncate"}
            />
            <Label
              text={user?.email || "Email"}
              class_name={"text-xs font-light truncate"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTopPart;
