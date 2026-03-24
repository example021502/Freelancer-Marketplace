import React, { useState, useEffect } from "react";
import { get_projects, getUser } from "../../utils/backend_calls_functions";
import Label from "../../common/Label";
import Image from "../../common/Image";
import { getAvatar } from "../../utils/vectors";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import MoreInfor from "./MoreInfor";

function MainDisplay() {
  const [info, setInfo] = useState(false);
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState({});
  const load_data = async () => {
    const data = await get_projects();
    setProjects(data);
  };

  useEffect(() => {
    load_data();
  }, []);

  const handleMoreInfo = async (freelancer_id) => {
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
    if (Object.values(user_data).length > 0) setInfo(true);
  };

  if (projects.length === 0 || !Array.isArray(projects)) {
    return (
      <div className="w-full h-full flex items-center justify-center font-bold text-lg text-green-800/40">
        <Label text={"Nothing to display"} />
      </div>
    );
  }
  return (
    <div className="w-full flex items-start justify-start gap-2 flex-col">
      <Label
        text={"Projects"}
        class_name={"w-full border-b-2 border-green-800/20"}
      />
      <div className="w-full gap-4 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {projects.map((project, i) => {
          const avatar = getAvatar(project.title);
          const range = `$${project.budget_min} - $${project.budget_max}`;
          return (
            <div
              key={i}
              className="w-full shadow-lg space-y-2 p-2 rounded-xl bg-gray-200"
            >
              <Image
                avatar={avatar}
                image={project.image_url}
                class_name={
                  "w-full h-30 object-cover border-2 border-gray-50 rounded-xl"
                }
              />
              <div className="w-full text-sm flex flex-col bg-gray-50 p-2 rounded-xl items-start justify-start gap-2">
                <div className="w-full flex flex-col items-start justify-start gap-2 relative">
                  <span
                    onClick={() => handleMoreInfo(project.freelancer_id)}
                    className=" rounded-full p-1 backdrop-blur-[2px] cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.04] bg-green-800/20 flex items-center justify-center w-4 h-4 absolute top-1 right-1"
                  >
                    <Icon icon={"ri-info-i"} />
                  </span>
                  <Label text={project.title} class_name={"font-semibold"} />
                  <Label text={project.description} class_name={"text-xs"} />
                  <div className=" bg-green-800/10 px-2 rounded-xl text-xs flex flex-row items-start justify-start space-x-1">
                    <Label text={"Price:"} />
                    <Label text={range} class_name={"font-semibold"} />
                  </div>
                </div>
                <div className="w-full grid grid-cols-2 items-center justify-center gap-4">
                  {["WhatsApp", "Message"].map((btn) => {
                    return (
                      <Button
                        text={btn}
                        key={btn}
                        class_name={`w-full font-semibold rounded-xl ${btn === "WhatsApp" ? "bg-green-800 text-gray-50 py-1" : "border-2 border-green-800 py-0.5"}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {info && <MoreInfor setInfo={setInfo} user={user} />}
    </div>
  );
}

export default MainDisplay;
