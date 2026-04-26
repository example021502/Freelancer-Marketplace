import React from "react";
import Image from "./Image";
import Label from "./Label";
import { getInitials } from "../utils/vectors";
import Icon from "./Icon";

function Logo() {
  return (
    <div className="w-full text-xl tracking-wide font-light flex flex-row items-center justify-start space-x-2">
      {/* <Image
        avatar={getInitials("Freelancer Marketplace")}
        image={"https://i.ibb.co/Lz43dp3Y/logo-light.png"}
        class_name={"w-10 h-10 rounded-full"}
      /> */}
      <Icon
        icon={"ri-signal-cellular-3-fill"}
        class_name={"flex border-b-2  items-center justify-center"}
      />
      <Label text={"Marketplace"} />
    </div>
  );
}

export default Logo;
