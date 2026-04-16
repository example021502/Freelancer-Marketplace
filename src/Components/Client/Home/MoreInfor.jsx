<<<<<<< HEAD
import React, { useEffect, useState } from "react";
=======
import React from "react";
>>>>>>> fd3b9a5c3396bc61f49c76e859831324bfda9ae6
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import ProfessionalInfor from "./ProfessionalInfor";
import Image from "../../common/Image";
import { getAvatar } from "../../utils/vectors";
import { get_personal_information } from "../../utils/backend_calls_functions";

function MoreInfor({ setInfo, user }) {
  const [personal_info, setPersonal_info] = useState({});
  const personal_information = async () => {
    const user_information = await get_personal_information(user.user_id);
    setPersonal_info(user_information);
  };

  useEffect(() => {
    personal_information();
  }, []);

  return createPortal(
    <AnimatePresence mode="wait">
      <div
        onClick={() => setInfo(false)}
        className="absolute text-sm top-0 overflow-hidden z-20 overflow-y-auto no-scrollbar p-4 left-0 inset-0 bg-gray-800/10 flex items-center justify-end"
      >
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          exit={{ width: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full space-y-2 sm:w-[60%] md:w-[50%] lg:w-[40%] max-h-full overflow-y-auto no-scrollbar flex flex-col items-center justify-start bg-gray-50 rounded-xl p-4 gap-4"
        >
          <div className="w-full relative flex flex-row items-center justify-between border-b-2 border-green-800/20">
            <Label
              text={`${personal_info.first_name} ${personal_info.last_name}`}
              class_name={"w-full text-lg font-semibold"}
            />
            <span
              onClick={() => setInfo(false)}
              className="h-6 w-6 absolute border-2 border-red-800 text-lg text-red-800 cursor-pointer transition-all ease-in-out duration-150 hover:rotate-90 top-0 right-0 rounded-full flex items-center justify-center"
            >
              <Icon icon={"ri-close-line"} />
            </span>
          </div>
          <Image
            image={personal_info.profile_picture}
            avatar={getAvatar(
              `${personal_info.first_name} ${personal_info.last_name}`,
            )}
            class_name={
              "w-full h-36 border object-contain border-gray-300 rounded-xl"
            }
          />
          <ProfessionalInfor user={user} personal_info={personal_info} />
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body,
  );
}

export default MoreInfor;
