import React, { useEffect, useState } from "react";
import { get_user_projects } from "../utils/backend_calls_functions";
import HomeTopPart from "../Client/Home/HomeTopPart";
import Label from "../common/Label";
import Icon from "../common/Icon";
import Input from "../common/Input";
import ProjectsContainer from "./ProjectsContainer";

function AssignedProjects() {
  const [projects_state, setProjects_state] = useState([]);

  //   function to load data from backend
  const load_data = async () => {
    const user_email = sessionStorage.getItem("logged_user_email");
    const { projects, notifications, images, payments } =
      await get_user_projects(user_email);
    setProjects_state({ projects, notifications, images, payments });
  };

  //   loading the project data
  useEffect(() => {
    load_data();
  }, []);

  if (projects_state.length === 0)
    return (
      <div className="w-full flex items-center justify-center font-bold text-lg text-green-800/80">
        Loading Data...
      </div>
    );

  // putting data projects in a Map() for optimization
  const mappedProjectsData = new Map(
    projects_state?.projects?.map((project) => [project.project_id, project]),
  );

  // stats counting
  const total_projects = mappedProjectsData?.size || 0;
  let stated_projects = 0;
  let pending_projects = 0;
  let completed_projects = 0;
  let abandoned_projects = 0;

  //actions buttons
  const buttons = [{ label: "New Task", icon: "ri-add-line" }];

  // updating the stats values
  mappedProjectsData?.forEach((project, id) => {
    if (project.project_status === "open") {
      startedStates += +1;
      return;
    }

    if (project.project_status === "completed") {
      completed_projects += +1;
      return;
    }
    if (project.project_status === "pending") {
      pending_projects += +1;
      return;
    }

    if (project.project_status === "abandoned") {
      abandoned_projects += +1;
      return;
    }
  });

  //   serching cryteria buttons
  const project_stats = [
    { label: "All", value: total_projects },
    { label: "Started", value: stated_projects },
    { label: "Pending", value: pending_projects },
    { label: "Completed", value: completed_projects },
    { label: "Abandoned", value: abandoned_projects },
  ];

  return (
    <div className="w-full flex flex-col text-sm gap-4 items-start justify-start">
      <HomeTopPart />
      <div className="w-full flex flex-col items-center justify-start gap-8 overflow-y-auto overflow-hidden no-scrollbar py-4 px-2">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="flex flex-col flex-1 py-4 items-start justify-start">
            <Label text={"Tasks"} class_name={"font-semibold text-lg"} />
            <Label
              text={"Check your assigned projects progress"}
              class_name={"text-xs font-lighter"}
            />
          </div>
          <div className="flex flex-2 flex-row gap-2 items-center justify-end">
            {buttons.map((btn) => {
              return (
                <div
                  key={btn.label}
                  className="flex flex-row gap-1 shadow-lg border-green-800 border-2 px-2 py-1 rounded-xl cursor-pointer transition-all ease-in-out duration-150 hover:scale-[1.02] items-center justify-center"
                >
                  <Icon icon={btn.icon} />
                  <Label text={btn.label} />
                </div>
              );
            })}
          </div>
        </div>
        <div className="w-full flex  bg-gray-200 p-4 rounded-xl items-start justify-start gap-8">
          {project_stats.map((item) => {
            return (
              <div
                key={item.label}
                className="flex gap-2 flex-row items-center justify-center text-sm"
              >
                <Label text={item.label} class_name={""} />
                <Input
                  read_only={true}
                  value={item.value}
                  class_name={
                    "ring-2 ring-green-800/80 pointer-events-none bg-green-800/10 focus:outline-none rounded-sm w-8 font-bold h-8 text-center"
                  }
                />
              </div>
            );
          })}
        </div>
        <ProjectsContainer
          mappedProjects={mappedProjectsData}
          notifications={projects_state.notifications}
          images={projects_state.images}
          payments={projects_state.payments}
        />
      </div>
    </div>
  );
}

export default AssignedProjects;
