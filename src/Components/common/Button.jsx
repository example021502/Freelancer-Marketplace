import React, { useState } from "react";

function Button({ class_name, text, onclick, id }) {
  return (
    <button
      onClick={() => onclick(id)}
      className={`cursor-pointer hover:scale-[1.05] transition-all ease-in-out duration-150 ${class_name}`}
    >
      {text}
    </button>
  );
}

export default Button;
