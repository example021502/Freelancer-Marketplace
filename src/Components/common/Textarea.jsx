import React from "react";

function Textarea({ class_name, handleInputChange, placeholder, value, id }) {
  return (
    <textarea
      className={`min-h-30 w-full ${class_name}`}
      onChange={(e) => handleInputChange(e.target.value, id)}
      placeholder={placeholder}
      value={value}
    />
  );
}

export default Textarea;
