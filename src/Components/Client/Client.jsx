import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";

function Client() {
  return (
    <div className="w-full h-dvh flex flex-row items-start justify-start space-x-2 p-2">
      <div className="p-2 rounded-xl items-center justify-start h-full bg-gray-200 flex flex-col space-y-2">
        <NavBar />
      </div>
      <main className="flex-1 rounded-xl">
        <Outlet />
      </main>
    </div>
  );
}

export default Client;
