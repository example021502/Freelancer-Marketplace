import React from "react";
import Label from "./Components/common/Label";
import Button from "./Components/common/Button";
import { useNavigate } from "react-router-dom";

function CatchAll() {
  const navigate = useNavigate();
  const handleBack = (_) => {
    return navigate(-1);
  };
  return (
    <div className="w-full flex flex-col items-center justify-center h-dvh">
      <Label
        text={"404"}
        class_name={
          "w-full text-[16em] border flex items-center justify-center font-bold text-gray-300 text-center -z-1 absolute top-0 right-0 inset-0"
        }
      />
      <Label
        text={"Lost in space ?"}
        class_name={
          "text-[1.6em] font-semibold text-gray-500 bg-white w-full text-center"
        }
      />
      <Button
        id={"back"}
        onclick={handleBack}
        text={"Go back"}
        class_name={
          "px-4 py-1.5 font-semibold text-[1em] tracking-wide text-gray-200 absolute bottom-35 rounded-xl bg-green-800"
        }
      />
    </div>
  );
}

export default CatchAll;
