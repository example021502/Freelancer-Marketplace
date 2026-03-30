import React from "react";
import Input from "../../common/Input";
import Icon from "../../common/Icon";

function Explore() {
  return (
    <div className="w-full flex flex-col items-center justify-start space-y-4">
      <div className="w-full flex items-center justify-start gap-2 bg-gray-200 p-2 rounded-xl">
        <div className="flex relative">
          <Icon
            icon={"ri-search-line"}
            class_name={
              "absolute top-0 left-2 bottom-0 flex items-center justify-center"
            }
          />
          <Input
            type={"text"}
            placeholder={"Enter anything to search..."}
            class_name={
              "min-w-100 border rounded-xl focus:outline-none focus:ring-2 ring-gray-400 border-gray-400 py-2 px-8"
            }
          />
        </div>
        {/*categories here */}
      </div>
      <div className="w-full gap-4 bg-gray-200 flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4"></div>
    </div>
  );
}

export default Explore;
