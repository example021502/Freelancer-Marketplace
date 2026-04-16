import React from "react";
import Label from "../../common/Label";

function Messages() {
  return (
    <div className="w-full flex flex-row items-start justify-start gap-2">
      <div className="max-w-64 rounded-xl w-full flex border border-gray-200 flex-col items-start p-2 justify-start">
        <Label
          text={"Chat"}
          class_name={
            "text-[1.5em] border-b border-gray-200 py-1 my-2 font-bold text-gray-800"
          }
        />
        <div
          aria-label="chat-users"
          className="h-full flex flex-col items-start justify-center"
        ></div>
      </div>
    </div>
  );
}

export default Messages;
