import React from "react";
import Label from "./Label";
import Icon from "./Icon";

function Header({ main_heading, sub_heading, setClosing }) {
  return (
    <div className="w-full mb-4 border-b border-gray-400 pb-2 flex flex-row items-center justify-between gap-2">
      <div className="flex-1 flex items-start justify-start flex-col">
        <Label
          text={main_heading || "N/A"}
          class_name={"font-semibold text-lg"}
        />
        <Label
          text={sub_heading || "N/A"}
          class_name={"font-lighter text-sm"}
        />
      </div>
      <span
        onClick={() => setClosing(false)}
        className={
          "w-8 h-8 rounded-full border-2 hover:border-red-800 border-green-800 text-green-800 transition-all ease-in-out duration-150 hover:rotate-180 flex items-center justify-center hover:text-red-800"
        }
      >
        <Icon icon={"ri-close-line"} />
      </span>
    </div>
  );
}

export default Header;
