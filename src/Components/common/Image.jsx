import React from "react";

function Image({ image, placeholder, avatar, initials, class_name }) {
  return (
    <img
      src={image || avatar || placeholder || initials}
      className={class_name}
    />
  );
}

export default Image;
