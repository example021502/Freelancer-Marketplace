import React, { useState } from "react";
import HomeTopPart from "./HomeTopPart";
import Categories from "./Categories";
import MainDisplay from "./MainDisplay";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import NewPostForm from "../NewPostForm/NewPostForm";
import { createPortal } from "react-dom";

function Home() {
  // new post controller state
  const [newPost, setNewPost] = useState(false);
  // extracting the current route path
  const { pathname } = useLocation();
  // checking if the current route path leads to explore component
  const isExplore = pathname.split("/").at(-1) === "explore";

  return (
    <div className="w-full space-y-4 h-full flex flex-col items-start justify-start">
      <HomeTopPart />
      {createPortal(
        <div
          onClick={() => setNewPost(true)}
          className={
            "px-4 text-sm absolute top-20 right-4 font-semibold py-1 ml-auto rounded-xl text-green-800 transition-all ease-in-out duration-150 hover:scale-[1.02] border-2 border-green-800 shadow-sm cursor-pointer flex items-center justify-center gap-1"
          }
        >
          <Icon icon={"ri-add-line"} />
          <Label text={"Post"} />
        </div>,
        document.body,
      )}

      <AnimatePresence>
        <div className="w-full flex-1 rounded-xl flex flex-col items-center justify-start space-y-8">
          <motion.div
            animate={{ height: isExplore ? 0 : "" }}
            transition={{ ease: "easeInOut", type: "tween", duration: 0.2 }}
            className={`w-full bg-white ${isExplore ? "hidden" : "flex"}`}
          >
            {!isExplore && <Categories />}
          </motion.div>
          <MainDisplay />
        </div>
      </AnimatePresence>
      {newPost && <NewPostForm setClosing={setNewPost} />}
    </div>
  );
}

export default Home;
