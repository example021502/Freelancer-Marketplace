import React, { useEffect, useState } from "react";
import Label from "../../common/Label";
import Button from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { get_information_common } from "../../utils/backend_calls_functions";

function ProfessionalInfor({ user, personal_info }) {
  const navigate = useNavigate();
  const [ratingData, setRatingData] = useState(null);
  const getRating = async () => {
    const data = await get_information_common(
      "ratings",
      "freelancer_id",
      user.freelancer_id,
    );
    setRatingData(data);
  };

  useEffect(() => {
    getRating();
  }, []);

  const infor = [
    { label: "Specialty: ", id: "specialty", value: user?.specialty },
    {
      label: "Completed Projects: ",
      id: "completed_projects",
      value: user?.["completed_projects"],
    },
    {
      label: "Experience: ",
      id: "experience",
      value: `${user?.experience_years} years`,
    },
    {
      label: "Country: ",
      id: "country",
      value: personal_info?.country || "N/A",
    },
    { label: "Email: ", id: "email", value: personal_info?.email || "N/A" },
    {
      label: "Contact: ",
      id: "contact",
      value: personal_info?.["mobile_number"] || "N/A",
    },
    {
      label: "Availability: ",
      id: "availability",
      value: user?.availability || "N/A",
    },
    { label: "Rating: ", id: "rate", value: `${ratingData?.rating} / 5` },
  ];

  const handleClicking = (id, value) => {
    if (id === "email") {
      const subject = "Freelancer Marketplace: Connection Request";
      const message =
        "Hello, I am interested in your services. I have a job to be done. May we connect and discuss how we can work together.";
      const maltoLink = `mailto:${value}?subject=${encodeURIComponent(subject)}&body${encodeURIComponent(message)}`;
      window.location.href = maltoLink;
      return;
    }

    const phoneLink = `tel:${value}`;
    window.location.href = phoneLink;
    return;
  };

  const handleMessaging = () => {
    navigate("/client/messages");
  };

  return (
    <div className="flex w-full flex-col items-center justify-center p-2 rounded-xl gap-4">
      <div className="w-full flex flex-col items-stat justify-start">
        <Label
          text={"Bio"}
          class_name={
            "w-full mb-2 border-b-2 border-green-800/40 font-semibold"
          }
        />
        <Label
          text={user.bio}
          class_name={
            "w-full bg-green-800/15 text-xs tracking-wide p-2 rounded-xl"
          }
        />
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-2">
        <Label
          text={"Information"}
          class_name={
            "w-full pb-1 border-b-2 border-green-800/40 font-semibold"
          }
        />
        <div className="grid text-xs grid-cols-2 w-full gap-2 items-start justify-start">
          {infor.map((info) => {
            const value =
              info.id === "availability"
                ? info.value === 0
                  ? "None"
                  : "Available"
                : info.value;

            const after_styles = `hover:after:w-full after:absolute relative after:bottom-0 after:left-0 after:w-0 mx-auto after:h-[2px] cursor-pointer after:bg-green-800/40 after:transition-all after:duration-150 after:ease-in-out`;

            const isClickable = info.id === "contact" || info.id === "email";
            return (
              <div
                onClick={() =>
                  isClickable ? handleClicking(info.id, info.value) : null
                }
                key={info.id}
                className="w-full flex flex-row flex-wrap items-center justify-start"
              >
                <Label text={info.label} class_name={"p-0.5"} />
                <Label
                  text={value}
                  class_name={`truncate p-0.5 font-semibold ${isClickable ? `${after_styles}` : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Button
          onclick={handleMessaging}
          text={"Message"}
          id={"messages"}
          class_name={
            "w-full py-1 font-semibold border-2 border-green-800 text-green-800 rounded-lg tracking-wide"
          }
        />
      </div>
    </div>
  );
}

export default ProfessionalInfor;
