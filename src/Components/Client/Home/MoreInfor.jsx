import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import ProfessionalInfor from "./ProfessionalInfor";
import Image from "../../common/Image";
import { getAvatar } from "../../utils/vectors";

function MoreInfor({ setInfo, user }) {
  return createPortal(
    <AnimatePresence mode="wait">
      <div
        onClick={() => setInfo(false)}
        className="absolute text-sm top-0 overflow-hidden overflow-y-auto no-scrollbar p-4 left-0 inset-0 bg-gray-800/10 flex items-center justify-end"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ width: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-[80%] space-y-2 sm:w-[60%] md:w-[50%] lg:w-[30%] max-h-[80%] flex flex-col items-center justify-start bg-gray-50 rounded-xl p-4"
        >
          <div className="w-full relative flex flex-row items-center justify-between border-b-2 border-green-800/20">
            <Label
              text={user.name}
              class_name={"w-full text-lg font-semibold"}
            />
            <span
              onClick={() => setInfo(false)}
              className="h-6 w-6 absolute border-2 border-red-800 text-lg text-red-800 cursor-pointer transition-all ease-in-out duration-150 hover:rotate-90 top-0 right-2 rounded-full flex items-center justify-center"
            >
              <Icon icon={"ri-close-line"} />
            </span>
          </div>
          <Image
            avatar={getAvatar(user.name)}
            image={user?.["profile_picture"]}
            class_name={"w-full h-40 rounded-xl"}
          />
          <ProfessionalInfor user={user} />
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

export default MoreInfor;
