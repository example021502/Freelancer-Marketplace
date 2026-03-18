import React, { useState, useEffect, useRef } from "react";
import Input from "../common/Input";
import Icon from "../common/Icon";
import Label from "../common/Label";

function SelectRole({ element, handleInputChange, value }) {
  const targetRef = useRef();
  const [expand, setExpand] = useState(false);
  useEffect(() => {
    handleInputChange("Client", "role");
  }, []);
  const toggle_expand = () => {
    setExpand((prev) => !prev);
  };

  useEffect(() => {
    const updateClick = (e) => {
      const target = targetRef.current;
      if (!target) return;
      if (!target.contains(e.target)) setExpand(false);
    };
    document.addEventListener("mousedown", updateClick);
    return () => document.removeEventListener("mousedown", updateClick);
  }, []);

  const items = ["Client", "Freelancer"];
  return (
    <div
      ref={targetRef}
      onClick={toggle_expand}
      className="w-full relative cursor-pointer"
    >
      <Icon
        icon={"ri-arrow-down-s-line"}
        class_name={`absolute top-0 bottom-0 flex items-center justify-center text-xl right-4 transition-all duration-150 ease-in-out ${expand ? "rotate-180" : ""}`}
      />
      <Input
        value={value}
        read_only={true}
        id={element.id}
        placeholder={element.placeholder}
        class_name={
          "w-full p-3 md:p-2 focus:outline-none focus:ring ring-green-800 rounded-xl border border-gray-400 pointer-events-none"
        }
        type={element.type}
      />
      {expand && (
        <div className="absolute z-200 top-full right-2 shadow-sm border py-2 border-gray-300 min-w-[30%] bg-gray-50 grid grid-cols-1 rounded-xl items-center justify-center">
          {items.map((item) => {
            return (
              <div
                onClick={() => {
                  (handleInputChange(item, "role"), toggle_expand);
                }}
                className="flex py-1 items-center cursor-pointer hover:bg-gray-200 justify-start px-2"
              >
                <Label text={item} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectRole;
