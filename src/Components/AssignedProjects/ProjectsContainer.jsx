import React from "react";
import Label from "../common/Label";
import Icon from "../common/Icon";
import Image from "../common/Image";
import { getAvatar, getIcon, getInitials } from "../utils/vectors";

function ProjectsContainer({
  mappedProjects,
  notifications,
  images,
  payments,
}) {
  const project_array = Array.from(mappedProjects.values());

  const getPaymentStatus = (project_id) => {
    const filtered_payments = payments.filter(
      (p) => p.project_id === project_id,
    );

    return filtered_payments[0]?.payment_status;
  };

  return (
    <div className="w-full grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {project_array.map((project, i) => {
        const isCompleted = project.project_status === "completed";
        const footer = [
          {
            label: isCompleted ? "Date Completed:" : project.project_status,
            value: isCompleted ? project.date_completed.split("T")[0] : "",
          },
          {
            label: "Payment Status:",
            value: `💰 ${getPaymentStatus(project.project_id)}`,
          },
        ];
        const elements = [
          {
            label: "Status:",
            value: project.project_status,
            icon: "ri-bubble-chart-fill",
          },
          {
            label: "Deadline:",
            value: project.deadline.split("T")[0],
            icon: "ri-calendar-fill",
          },
        ];
        return (
          <div
            key={`project-${i}`}
            className="flex flex-col relative border p-3 border-gray-300 text-xs shadow-lg hover:scale-[1.02] transition-all duration-150 ease-in-out cursor-pointer rounded-xl items-start justify-between gap-2"
          >
            <Image
              avatar={getInitials(project.title)}
              class_name={
                "border border-gray-200 shadow-lg absolute h-12 w-12 rounded-full -right-1 -top-1"
              }
            />
            <Label text={project.title} class_name={"font-semibold text-sm"} />
            <div className="w-full flex flex-col items-center justify-start gap-2">
              {elements.map((item) => {
                return (
                  <div
                    key={item.label}
                    className="w-full flex flex-row gap-1 items-center justify-start"
                  >
                    <Icon
                      icon={item.icon}
                      class_name={
                        "border border-gray-300 text-green-800 w-8 h-8 text-lg flex items-center justify-center rounded-full"
                      }
                    />
                    <Label text={item.label} class_name={""} />
                    <Label text={item.value} class_name={"font-semibold"} />
                  </div>
                );
              })}
              <div className="w-full text-[0.8em] gap-2 grid-cols-2 grid items-start justify-center">
                {footer.map((item, i) => {
                  return (
                    <div
                      key={`footer-${i}`}
                      className="flex flex-col w-full items-start justify-start"
                    >
                      <Label text={item.label} class_name={""} />
                      <Label text={item.value} class_name={"font-semibold"} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProjectsContainer;
