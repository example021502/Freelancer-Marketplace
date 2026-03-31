import React, { useEffect, useState } from "react";
import HomeTopPart from "../.././Client/Home/HomeTopPart";

import {
  get_all_projects_by_email_and_role,
  get_user_data,
} from "../../utils/backend_calls_functions";

function AssignedProjects() {
  const [projects, setProjects] = useState([]);
  const [tokenData, setTokenData] = useState(null);

  const getEmail = async () => {
    const tokenData = await get_user_data();
    setTokenData(tokenData);
    const getUserProjects = await get_all_projects_by_email_and_role(
      tokenData?.email,
      tokenData?.role,
    );
    setProjects(getUserProjects);
    console.log(getUserProjects);
  };
  useEffect(() => {
    getEmail();
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-start ">
      <HomeTopPart />
      {tokenData?.email || "Email not available"}
    </div>
  );
}

export default AssignedProjects;
