import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function Client() {
  return (
    <div className="w-full h-dvh overflow-hidden relative flex flex-row items-start justify-start space-x-4 p-4">
      <div className="w-60 h-full hidden md:flex">
        <NavBar />
      </div>
      <main className="flex-1 h-full overflow-y-auto no-scrollbar rounded-xl space-y-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Client;
