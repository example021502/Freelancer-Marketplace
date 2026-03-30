import React from "react";
import { createPortal } from "react-dom";
import Label from "../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../common/Icon";

function LogoutComponent({ onConfirm }) {
  return createPortal(
    <div
      className={
        "w-full inset-0 bg-gray-800/10 absolute top-0 left-0 z-200 flex items-end justify-start p-4"
      }
    >
      <AnimatePresence mode={"wait"}>
        <motion.div
          initial={{ opacity: 0, x: "-100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          exit={{ x: "-100%" }}
          className={
            "w-fit flex items-center bg-gray-50 p-4 rounded-xl flex-col justify-center gap-2"
          }
        >
          <Label text={"Confirm to Exit!"} class_name={"text-sm"} />
          <div
            className={
              "w-full grid grid-cols-2 items-center justify-center gap-2"
            }
          >
            {["Confirm", "Cancel"].map((btn) => {
              const icon =
                btn === "Cancel"
                  ? "ri-close-circle-line"
                  : "ri-checkbox-circle-line";
              return (
                <div
                  key={btn}
                  onClick={() => onConfirm(btn)}
                  className={`w-full cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.02] flex flex-row items-center justify-center gap-2 px-2 rounded-xl ${btn === "Cancel" ? "border-2 border-red-800 text-red-800" : "bg-green-800 text-gray-100 py-0.5"}`}
                >
                  <Icon icon={icon} />
                  <Label text={btn} />
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default LogoutComponent;
