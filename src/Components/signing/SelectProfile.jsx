import React, { useState } from "react";
import Input from "../common/Input";
import Icon from "../common/Icon";
import Image from "../common/Image";
import Button from "../common/Button";

function SelectProfile({ handleInputChange, el, setClose }) {
  const [link, setLink] = useState("");

  const handlePasting = async (e) => {
    const value = await e.clipboardData.getData("text");
    setLink(value);
  };

  const handleAddingLink = () => {
    handleInputChange(link, "profile_picture");
    setClose(false);
  };
  const handleClearingLink = () => {
    setLink("");
    handleInputChange("", "profile_picture");
  };

  return (
    <div
      onClick={(e) => {
        setClose(false);
        e.stopPropagation();
      }}
      className="w-full absolute top-0 left-0 inset-0 bg-gray-800/10 items-center flex justify-center z-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="md:w-[30%]  space-y-4 relative bg-gray-50 flex items-center justify-center flex-col p-4 rounded-xl border-gray-400 border shadow-sm"
      >
        {link !== "" ? (
          <Image
            image={link}
            class_name={"h-20 w-20 rounded-xl border border-gray-300"}
          />
        ) : (
          <Icon
            icon={"ri-user-line"}
            class_name={
              "h-20 w-20 flex items-center justify-center rounded-full text-[4em] border border-gray-300"
            }
          />
        )}

        <Input
          value={link}
          read_only={true}
          id={el.id}
          placeholder={el.placeholder}
          class_name={
            "w-full cursor-pointer p-3 cursor md:p-2 focus:outline-none focus:ring ring-green-800 rounded-xl border border-gray-400"
          }
          type={"text"}
          onpaste={handlePasting}
        />

        <div className=" w-full flex items-center justify-center gap-4 flex-row">
          <Button
            onclick={() => handleAddingLink()}
            text={"+ Add"}
            class_name={
              "px-4 py-1.5 rounded-xl text-gray-50 bg-green-800 font-semibold tracking-wider"
            }
          />
          <Button
            onclick={() => handleClearingLink()}
            text={"Clear"}
            class_name={
              "px-4 py-1 rounded-xl text-red-800 border-2 border-red-800 font-semibold tracking-wider"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default SelectProfile;
