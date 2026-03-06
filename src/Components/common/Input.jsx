import React from "react";

function Input({
  placeholder,
  autocomplete,
  value,
  onchange,
  id,
  class_name,
  type,
}) {
  return (
    <input
      type={type}
      autoComplete={autocomplete}
      className={`${class_name}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onchange(e.target.value, id)}
    />
  );
}

export default Input;
