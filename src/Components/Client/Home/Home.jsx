import React from "react";
import HomeTopPart from "./HomeTopPart";
import Categories from "./Categories";
import MainDisplay from "./MainDisplay";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const { pathname } = useLocation();
  const isExplore = pathname.split("/").at(-1) === "explore";

  return (
    <AnimatePresence>
      <div className="w-full h-full flex-1 rounded-xl flex flex-col items-center justify-start space-y-8">
        <HomeTopPart />
        <motion.div
          animate={{ height: isExplore ? 0 : "" }}
          transition={{ ease: "easeInOut", type: "tween", duration: 0.2 }}
          className={`w-full bg-white z-20 ${isExplore ? "hidden" : "flex"}`}
        >
          {!isExplore && <Categories />}
        </motion.div>
        <MainDisplay />
      </div>
    </AnimatePresence>
  );
}

export default Home;
