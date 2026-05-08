import React from "react";
import { getIcon } from "../utils/vectors";
const avatar = getIcon("image");

function Image({ image, placeholder, avatar, class_name }) {
  return <img src={image ?? avatar ?? placeholder} className={class_name} />;
}

export default Image;
