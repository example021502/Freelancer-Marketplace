import React from "react";

function Label({ class_name, text }) {
  return <label className={class_name}>{text}</label>;
}

export default Label;
