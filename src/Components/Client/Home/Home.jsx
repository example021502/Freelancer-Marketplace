import React from "react";
import HomeTopPart from "./HomeTopPart";
import Categories from "./Categories";
import MainDisplay from "./MainDisplay";

function Home() {
  return (
    <div className="w-full h-full flex-1 rounded-xl flex flex-col items-center justify-start space-y-8">
      <HomeTopPart />
      <Categories />
      <MainDisplay />
    </div>
  );
}

export default Home;
