import React from "react";
import Label from "../../common/Label";

function ProfessionalInfor({ user }) {
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
    { label: "Country: ", id: "country", value: user?.country },
    { label: "Email: ", id: "email", value: user?.email },
    { label: "Contact: ", id: "contact", value: user?.["mobile_number"] },
    { label: "Availability: ", id: "availability", value: user?.availability },
    { label: "Rating: ", id: "rate", value: user?.rating },
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
                className="w-full flex flex-row items-center justify-start"
              >
                <Label text={info.label} class_name={"truncate p-0.5"} />
                <Label
                  text={value}
                  class_name={`truncate p-0.5 ${isClickable ? `${after_styles}` : ""}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfessionalInfor;
