import React from "react";

function Input({ placeholder, value, onchange, id, class_name, type }) {
  return (
    <input
      type={type}
      className={`${class_name}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onchange(e.target.value, id)}
    />
  );
}

export default Input;
