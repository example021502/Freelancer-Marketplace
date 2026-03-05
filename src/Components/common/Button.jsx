import React from "react";

function Button({ text, class_name, id, type, onBtnClick }) {
  return (
    <button
      type={type}
      onClick={() => onBtnClick(_id)}
      id={id}
      className={`rounded-lg cursor hover:scale-[1.05] transition-all ease-in-out duration-200 ${class_name}`}
    >
      {text}
    </button>
  );
}

export default Button;
