import React, { useState, useEffect } from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../common/Logo";
import { motion, AnimatePresence } from "framer-motion";
import LogoutComponent from "./LogoutComponent";

function NavBar({ clicked }) {
  const navigate = useNavigate();
  // navigation buttons
  const buttons = [
    { label: "Home", id: "home", icon: "ri-layout-2-line" },
    { label: "Explore", id: "explore", icon: "ri-space-ship-2-line" },
    {
      label: "Assigned Projects",
      id: "assigned_projects",
      icon: "ri-file-list-line",
    },
    { label: "Messages", id: "messages", icon: "ri-message-3-line" },
    { label: "Payments & Bills", id: "payments_bills", icon: "ri-wallet-line" },
    { label: "Settings", id: "settings", icon: "ri-settings-4-line" },
    { label: "Logout", id: "logout", icon: "ri-logout-box-line" },
  ];
  // buttons logout state, navigation state
  const [navbutton, setNavbutton] = useState("home");
  const [logout, setLogout] = useState(false);

  // xtracting the current path to set the active navigation button
  const { pathname } = useLocation();
  useEffect(() => {
    const section = pathname.split("/").at(-1);
    if (section === "client") setNavbutton("home");
    else setNavbutton(section);
  }, [pathname]);

  // handling navigation based on the button clicked, if logout is clicked, show the logout confirmation component
  const handleNavigation = (id) => {
    if (id === "logout") return setLogout(true);
    if (id === "home") return navigate("/client");
    navigate(`/client/${id}`);
  };

  // handling the confirmation of logout, if cancel is clicked, close the confirmation component and navigate to home, if confirm is clicked, clear session storage and navigate to login page after a short delay
  const handleConfirming = (name) => {
    if (name === "Cancel") {
      setLogout(false);
      navigate("/client");
      return;
    }
    // adding a short delay before clearing session storage and navigating to login page to allow the user to see the confirmation message
    setTimeout(() => {
      sessionStorage.clear();
      navigate("/");
    }, 1000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          x: "-100%",
        }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: "-100%" }}
        transition={{ duration: 0.2, type: "tween", ease: "easeInOut" }}
        className={`flex w-full h-full space-y-3 text-sm flex-col items-start justify-start`}
      >
        <div className="w-full p-2 py-3 border-b-2 border-green-800/20 hidden md:flex">
          <Logo />
        </div>

        {buttons.map((btn) => {
          const isSelected = btn.id === navbutton;
          return (
            <div
              key={btn.id}
              onClick={() => {
                clicked ? clicked() : null;
                handleNavigation(btn.id);
              }}
              className={`flex flex-row py-2.5 px-4 hover:bg-green-800/10 rounded-xl bg-gray-100 w-full items-center justify-start space-x-2 cursor-pointer transition-all ease-in0out duration-150 hover:scale-[1.02] ${isSelected ? "border-l-4 border-green-800" : ""} ${btn.id === "logout" ? "mt-auto" : ""}`}
            >
              <Icon icon={btn.icon} />

              <Label text={btn.label} />
            </div>
          );
        })}
        {logout && <LogoutComponent onConfirm={handleConfirming} />}
      </motion.div>
    </AnimatePresence>
  );
}

export default NavBar;
