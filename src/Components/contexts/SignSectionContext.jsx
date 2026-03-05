import React, { createContext, useEffect, useState } from "react";
export const sign_section_context = createContext(null);

function signSectionContext({ children }) {
  const [sign_section, set_sign_section] = useState(() => {
    return sessionStorage.getItem("sign_section") || "signin";
  });

  const handleChangeSection = (section) => {
    set_sign_section(section);
    sessionStorage.setItem("sign_section", section);
  };

  return (
    <sign_section_context.Provider
      value={{ sign_section, handleChangeSection }}
    >
      {children}
    </sign_section_context.Provider>
  );
}

export default signSectionContext;
