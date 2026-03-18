import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Phone_number({ require, default_value, handleInputChange }) {
  return (
    <PhoneInput
      country={"in"}
      require={require || false}
      defaultValue={default_value}
      onChange={(e) => handleInputChange(e, "mobile_number")}
      containerStyle={{ zIndex: 5 }}
      containerClass="text-sm w-full rounded-lg border border-gray-400"
      dropdownStyle={{
        padding: 4,
        position: "absolute",
        top: "80%",
        left: 0,
        height: "208px",
        zIndex: 1000,
      }}
      buttonStyle={{
        border: "none",
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "transparent",
      }}
      inputStyle={{
        width: "100%",
        paddingTop: "4px",
        paddingBottom: "4px",
        paddingLeft: "3em",
        border: "none",
        backgroundColor: "transparent",
      }}
      inputClass="w-full p-3 md:p-2 focus:outline-none focus:ring ring-green-800 rounded-xl border border-gray-400"
    />
  );
}

export default Phone_number;
