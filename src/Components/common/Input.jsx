import React from "react";

function Input({
  placeholder,
  class_name,
  default_value,
  read_only,
  type,
  auto_complete = "off",
  value,
  id,
  onpaste,
  onchange,
  auto_focus = false,
}) {
  return (
    <input
      onPaste={(e) => onpaste(e)}
      autoFocus={auto_focus}
      value={value}
      readOnly={read_only}
      autoComplete={auto_complete}
      type={type}
      placeholder={placeholder}
      defaultValue={default_value}
      className={class_name}
      onChange={(e) => onchange(e.target.value, id)}
    />
  );
}

export default Input;
