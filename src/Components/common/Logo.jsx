import React from "react";
import Image from "./Image";
import Label from "./Label";

function Logo() {
  return (
    <div className="w-full text-xl tracking-wide font-light flex flex-row items-center justify-start space-x-2">
      <Image
        initials={"Freelancer Marketplace"}
        image={"https://i.ibb.co/Lz43dp3Y/logo-light.png"}
        class_name={"w-10 h-10 rounded-full"}
      />
      <Label text={"Marketplace"} />
    </div>
  );
}

export default Logo;
