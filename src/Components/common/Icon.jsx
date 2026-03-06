import React from "react";

function Icon({ icon, class_name }) {
  return <i className={`${icon} ${class_name}`} />;
}

export default Icon;
