import React from "react";

function Image({ image, placeholder, avatar, class_name }) {
  return <img src={image || avatar || placeholder} className={class_name} />;
}

export default Image;
