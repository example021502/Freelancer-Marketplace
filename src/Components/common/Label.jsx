import React from "react";

function Label({ class_name, text, id }) {
  return (
    <label id={id} className={`${class_name}`}>
      {text}
    </label>
  );
}

export default Label;
