import React, { useState, useEffect } from "react";
import {
  get_projects,
  get_information_common,
} from "../../utils/backend_calls_functions";
import Label from "../../common/Label";
import Image from "../../common/Image";
import { getIcon } from "../../utils/vectors";
import Icon from "../../common/Icon";
import MoreInfor from "./MoreInfor";

function MainDisplay() {
  const [section_selected, setSection_selected] = useState("All");
  const [info, setInfo] = useState(false);
  const [projects, setProjects] = useState();
  const [project_image, setProject_image] = useState("");
  const [user, setUser] = useState({});
  // loader function
  const load_data = async () => {
    const data = await get_projects();
    setProjects(data?.result || []);
  };

  // load the initial public projects for display
  useEffect(() => {
    load_data();
  }, []);

  // handling loading assigned projects under production
  const handleMoreInfo = async (freelancer_id, image_url) => {
    const user_data = await get_information_common(
      "freelancer_profiles",
      "freelancer_id",
      freelancer_id,
    );
    setUser(user_data);

    if (user_data) {
      setProject_image(image_url);
      setInfo(true);
    }
  };

  const handleSelectingSection = (name) => {
    setSection_selected(name);
  };

  if (projects?.length === 0 || !Array.isArray(projects)) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg text-green-800/40">
        <Label text={"Nothing to Display yet!"} />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex items-start justify-start gap-2 flex-col">
      <div
        className={
          "w-full gap-2 border-b-2 pb-2 flex flex-row border-green-800/20"
        }
      >
        {["All", "Recent"].map((btn) => {
          const isSelected = btn === section_selected;
          return (
            <div key={btn} onClick={() => handleSelectingSection(btn)}>
              <Label
                key={btn}
                text={btn}
                class_name={`px-2 rounded-lg cursor-pointer ${isSelected ? "border-2 border-green-800/40" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full gap-4 flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {projects.map((project, i) => {
          const avatar = getIcon(project.title);
          const range = `$${project.budget_min} - $${project.budget_max}`;
          return (
            <div
              onClick={() =>
                handleMoreInfo(project.freelancer_id, project.image_url)
              }
              key={i}
              className="w-full h-60 flex relative flex-col shadow-sm rounded-lg overflow-hidden bg-gray-200"
            >
              <div className=" px-2 py-1 text-xs flex absolute top-2 right-2 flex-row rounded-md bg-gray-50/80 items-start justify-start gap-1 space-2">
                <Icon icon={"ri-star-fill"} class_name={"text-yellow-600"} />
                <Label text={project.rating || "N/A"} />
              </div>
              <Image
                avatar={avatar}
                image={project.image_url}
                class_name={"w-full h-[60%] object-contain"}
              />
              <div className="w-full  relative flex-1 text-xs flex flex-col bg-gray-50 p-2 items-start justify-center gap-1">
                <span className=" rounded-full p-1 backdrop-blur-[2px] cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.04] bg-green-800/20 flex items-center justify-center w-4 h-4 absolute top-1 right-1">
                  <Icon icon={"ri-info-i"} />
                </span>
                <Label
                  text={range || "N/A"}
                  class_name={
                    "font-bold text-lg backdrop-blur-sm shadow-lg px-2 py-1 -mt-8 bg-gray-50/60 rounded-xl text-sm"
                  }
                />
                <Label
                  text={project.title || "No title available"}
                  class_name={"font-semibold"}
                />
                <Label
                  text={project.description || "No description available"}
                  class_name={"text-xs"}
                />
              </div>
            </div>
          );
        })}
      </div>
      {info && (
        <MoreInfor
          setInfo={setInfo}
          user={user}
          project_image={project_image}
        />
      )}
    </div>
  );
}

export default MainDisplay;
