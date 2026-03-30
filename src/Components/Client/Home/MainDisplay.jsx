import React, { useState, useEffect } from "react";
import { get_projects, getUser } from "../../utils/backend_calls_functions";
import Label from "../../common/Label";
import Image from "../../common/Image";
import { getAvatar } from "../../utils/vectors";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import MoreInfor from "./MoreInfor";

function MainDisplay() {
  const [section_selected, setSection_selected] = useState("All");
  const [info, setInfo] = useState(false);
  const [projects, setProjects] = useState([]);
  const [project_image, setProject_image] = useState("");
  const [user, setUser] = useState({});
  const load_data = async () => {
    const data = await get_projects();
    setProjects(data);
  };

  useEffect(() => {
    load_data();
  }, []);

  const handleMoreInfo = async (freelancer_id, project_url) => {
    const table = "freelancer_profiles";
    const target_field = "freelancer_id";
    const fields = [
      "specialty",
      "bio",
      "hourly_rate",
      "experience_years",
      "availability",
      "portfolio_url",
      "rating",
      "completed_projects",
      "name",
      "email",
      "mobile_number",
      "country",
      "profile_picture",
    ];

    const user_data = await getUser(table, freelancer_id, fields, target_field);
    setUser(user_data);
    if (Object.values(user_data).length > 0) {
      setProject_image(project_url);
      setInfo(true);
    }
  };

  const handleSelectingSection = (name) => {
    setSection_selected(name);
  };

  if (projects.length === 0 || !Array.isArray(projects)) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg text-green-800/40">
        <Label text={"Loading..."} />
      </div>
    );
  }
  return (
    <div className="w-full z-10 flex items-start justify-start gap-2 flex-col">
      <div
        className={"w-full gap-2 border-b-2 flex flex-row border-green-800/20"}
      >
        {["All", "Recent"].map((btn) => {
          const isSelected = btn === section_selected;
          return (
            <div key={btn} onClick={() => handleSelectingSection(btn)}>
              <Label
                key={btn}
                text={btn}
                class_name={`px-2 rounded-lg cursor-pointer ${isSelected ? "border-2 border-b-0 border-green-800/40" : ""}`}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full gap-4 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {projects.map((project, i) => {
          const avatar = getAvatar(project.title);
          const range = `$${project.budget_min} - $${project.budget_max}`;
          return (
            <div
              onClick={() =>
                handleMoreInfo(project.freelancer_id, project.image_url)
              }
              key={i}
              className="w-full h-60 flex flex-col shadow-lg rounded-lg overflow-hidden bg-gray-200"
            >
              <Image
                avatar={avatar}
                image={project.image_url}
                class_name={
                  "w-full h-[60%] object-contain border-2 border-gray-50"
                }
              />
              <div className="w-full relative flex-1 text-xs flex flex-col bg-gray-50 p-2 items-start justify-start gap-1">
                <span className=" rounded-full p-1 backdrop-blur-[2px] cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.04] bg-green-800/20 flex items-center justify-center w-4 h-4 absolute top-1 right-1">
                  <Icon icon={"ri-info-i"} />
                </span>
                <Label text={range} class_name={"font-semibold text-sm"} />
                <Label text={project.title} class_name={"font-semibold"} />
                <Label text={project.description} class_name={"text-xs"} />
                <div className=" px-2 flex flex-row rounded-md bg-yellow-600/20 items-start justify-start gap-1 space-2">
                  <Icon icon={"ri-star-fill"} class_name={"text-yellow-600"} />
                  <Label text={project.rating} />
                </div>
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
