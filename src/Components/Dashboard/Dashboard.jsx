import React, { useContext, useState } from "react";
import { DashboardContext } from "../contexts/DashboardContext";
import NavBar from "./NavBar/NavBar";
import DashboardHome from "./DashboardHome/DashboardHome";
import PortfolioSection from "./Portfolio/PortfolioSection";
import ProjectsSection from "./Projects/ProjectsSection";
import MessagesSection from "./Messages/MessagesSection";
import ProfileSection from "./Profile/ProfileSection";

function Dashboard() {
  const { dashboardState } = useContext(DashboardContext);
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome />;
      case "portfolio":
        return <PortfolioSection />;
      case "projects":
        return <ProjectsSection />;
      case "messages":
        return <MessagesSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="w-full h-screen flex flex-row bg-gray-100">
      <NavBar />
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {dashboardState.userProfile.name}!
            </h1>
            <p className="text-gray-600">Let's get to work today.</p>
          </div>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
