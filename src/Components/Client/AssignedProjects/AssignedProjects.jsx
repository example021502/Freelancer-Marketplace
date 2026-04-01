import React, { useEffect, useState } from "react";
import HomeTopPart from "../.././Client/Home/HomeTopPart";
import Label from "../../common/Label";
import Icon from "../../common/Icon";
import Image from "../../common/Image";
import { getAvatar, getIcon } from "../../utils/vectors";

import {
  get_all_projects_by_email_and_role,
  get_user_data,
} from "../../utils/backend_calls_functions";
import { img } from "framer-motion/client";

function AssignedProjects() {
  const [projects, setProjects] = useState([]);
  const [tokenData, setTokenData] = useState(null);
  const [projectStats, setProjectStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    pending: 0,
    abandoned: 0,
  });

  const getEmail = async () => {
    const tokenData = await get_user_data();
    setTokenData(tokenData);
    const getUserProjects = await get_all_projects_by_email_and_role(
      tokenData?.email,
      tokenData?.role,
    );
    console.log("User Projects:", getUserProjects);
    setProjects(getUserProjects);
    const projects_data = getUserProjects?.projects;

    // Calculate project stats
    if (getUserProjects) {
      const total = Object.values(projects_data).length;
      const inProgress = Object.values(projects_data).filter(
        (p) => p.project_status === "in progress",
      ).length;
      const completed = Object.values(projects_data).filter(
        (p) => p.project_status === "completed",
      ).length;
      const pending = Object.values(projects_data).filter(
        (p) => p.project_status === "pending",
      ).length;
      const abandoned = Object.values(projects_data).filter(
        (p) => p.project_status === "abandoned",
      ).length;
      setProjectStats({
        total: total,
        inProgress: inProgress,
        completed: completed,
        pending: pending,
        abandoned: abandoned,
      });
    }
  };

  useEffect(() => {
    getEmail();
  }, []);

  // Helper function to format date
  const getDate = (dateString) => {
    if (!dateString) return "N/A";
    const [year, month, day] = dateString.split("T")?.[0].split("-");
    return `${day}/${month}/${year}`;
  };

  const getImage = (project_id) => {
    const image = projects?.images?.find(
      (img) => img.project_id === project_id,
    );
    return image ? image.image_url : null;
  };

  const categories = [
    { label: "All", count: projectStats.total, id: "all" },
    { label: "In Progress", count: projectStats.inProgress, id: "in_progress" },
    { label: "Completed", count: projectStats.completed, id: "completed" },
    { label: "Pending", count: projectStats.pending, id: "pending" },
    { label: "Abandoned", count: projectStats.abandoned, id: "abandoned" },
  ];

  return (
    <div className="w-full text-sm flex flex-col items-center justify-start space-y-8 px-2">
      <HomeTopPart />

      {/* Project Stats Bar */}
      <div className="w-full flex flex-wrap gap-2 p-2 bg-gray-100 rounded-xl">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <Label text={cat.label} class_name={"text-sm font-medium"} />
            <span className="px-2 py-1 bg-green-800/10 text-green-800 rounded-full text-sm font-semibold">
              {cat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="w-full text-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {projects.projects?.map((p) => {
          return (
            <div
              key={p.project_id}
              className="w-full transition-all ease-in-out duration-0.2 hover:scale-[1.02] pt-6 flex flex-col items-center relative justify-start gap-2 rounded-xl p-3 shadow-sm bg-gray-50 border-gray-100"
            >
              <Image
                avatar={getIcon(p.title)}
                class_name={
                  "w-10 h-10 rounded-full border-gray-200 bg-gray-50 border shadow-xl object-cover absolute -top-4 left-0 right-0 mx-auto"
                }
              />
              <Label text={p.title} class_name={"font-semibold"} />
              <div className="w-full flex flex-col items-start justify-start">
                <div className="flex flex-col w-full gap-1 text-gray-600 items-center justify-start">
                  <Label text={"About"} class_name={"font-medium "} />
                  <Label
                    text={p.description || "No description provided."}
                    class_name={"w-full text-center"}
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-between gap-2">
                {[
                  { label: "Status:", value: p?.project_status || "N/A" },
                  { label: "Deadline:", value: getDate(p?.deadline) },
                ].map((e) => {
                  return (
                    <div
                      key={e.label}
                      className="flex flex-col w-full text-gray-600 items-start justify-start"
                    >
                      <Label text={e.label} class_name={"font-medium"} />
                      <Label text={e.value} class_name={"w-full text-center"} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AssignedProjects;
