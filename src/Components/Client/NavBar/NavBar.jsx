import React from "react";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import { useNavigate } from "react-router-dom";
import Image from "../../common/Image";
import Logo from "../../common/Logo";

function NavBar() {
  const navigate = useNavigate();
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

  const handleNavigation = (id) => {
    navigate();
  };

  return (
    <div className="w-60 h-full space-y-3 text-sm flex flex-col items-start justify-start">
      <div className="w-full p-2 py-3 border-b-2 border-green-800/20">
        <Logo />
      </div>
      {buttons.map((btn) => {
        return (
          <div
            key={btn.id}
            onClick={handleNavigation}
            className={`flex flex-row py-2.5 px-4 hover:bg-green-800/10 rounded-xl bg-gray-100 w-full items-center justify-start space-x-2 cursor-pointer transition-all ease-in0out duration-150 hover:scale-[1.02] ${btn.id === "logout" ? "mt-auto" : ""}`}
          >
            <Icon icon={btn.icon} />
            <Label text={btn.label} />
          </div>
        );
      })}
    </div>
  );
}

export default NavBar;
