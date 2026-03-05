import React, { createContext, useEffect, useState } from "react";
export const logged_user_context = createContext(null);
function LoggedUserContext({ children }) {
  const [logged_username, set_logged_username] = useState(() => {
    const user = sessionStorage.getItem("username");
    return user || "N/A";
  });

  useEffect(() => {
    sessionStorage.setItem("username", logged_username);
  }, [logged_username]);

  return (
    <logged_user_context.Provider
      value={{ logged_username, set_logged_username }}
    >
      {children}
    </logged_user_context.Provider>
  );
}

export default LoggedUserContext;
