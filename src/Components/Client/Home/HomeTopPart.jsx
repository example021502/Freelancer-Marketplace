import React, { useEffect, useState, useRef } from "react";
import Icon from "../../common/Icon";
import Input from "../../common/Input";
import Label from "../../common/Label";
import { get_user_data } from "../../utils/backend_calls_functions";
import NavBar from "../NavBar/NavBar";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

function HomeTopPart() {
  // state for showing the user's profile information
  const [showProfile, setShowProfile] = useState(false);
  // state for user data
  const [user, setUser] = useState(null);
  // state for expanding the navigation menu on small screens
  const [expand, setExpand] = useState(false);
  // get user data from the backend and set it to state, also store the user's email in session storage for later use
  const get_data = async () => {
    const data = await get_user_data();
    setUser(data);
  };
  // ref for the navigation menu, used to detect clicks outside of the menu to close it
  const menu = useRef();

  // loader user data on component mount
  useEffect(() => {
    get_data();
  }, []);

  // handle clicks outside of the navigation menu to close it
  useEffect(() => {
    const target = menu.current;
    if (!target) return;
    const handleClickOutside = (event) => {
      if (target && !target.contains(event.target)) {
        setExpand(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // handleing the click of the navigation buttons, if a button is clicked, close the navigation menu
  const btnClicked = () => {
    setExpand(false);
  };

  return (
    <div className="w-full z-10 p-2 sticky top-0 rounded-xl bg-gray-200 flex flex-row items-center justify-between ">
      <span
        onClick={() => setExpand((prev) => !prev)}
        className="flex items-center justify-start md:hidden"
      >
        <Icon
          icon={"ri-menu-line"}
          class_name={`font-semibold text-lg md:hidden transition-all duration-200 ease-in-out ${expand ? "rotate-180" : ""}`}
        />
      </span>

      <motion.div
        initial={{
          opacity: 0,
          x: "-100%",
        }}
        animate={{ opacity: expand ? 1 : 0, x: expand ? 0 : "-100%" }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        ref={menu}
        className="w-80 p-2 absolute md:hidden top-12 left-4 z-20000 bg-gray-50 rounded-xl shadow-xl"
      >
        <NavBar clicked={btnClicked} />
      </motion.div>
      <div className="w-80 relative md:flex hidden">
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
      <div className="px-2 text-md font-lighter ml-auto flex-row flex space-x-4">
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
        <div className="flex flex-row items-center justify-start space-x-2 overflow-hidden">
          <span
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center w-10 h-10 rounded-full font-lighter text-xl justify-center bg-gray-50"
          >
            <Icon icon={"ri-user-line"} />
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: showProfile ? "fit-content" : 0 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
              className={`flex text-xs font-semibold items-start justify-start flex-col ${showProfile ? "flex" : "hidden"}`}
            >
              <Label
                text={
                  `${user?.first_name} ${user?.last_name} | ${user?.role}` ||
                  "Username"
                }
                class_name={"truncate"}
              />
              <Label
                text={user?.email || "Email"}
                class_name={"text-xs font-light truncate"}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default HomeTopPart;
