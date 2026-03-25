import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

function ClientProtectedRoutes() {
  const isLogged = sessionStorage.getItem("log") === "true";
  useEffect(() => {
    if (!isLogged) toast.warning("Protected! Login first");
  }, [isLogged]);
  return isLogged ? <Outlet /> : <Navigate to={"/"} />;
}

export default ClientProtectedRoutes;
