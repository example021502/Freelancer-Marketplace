import React, { useContext } from "react";
import { sign_section_context } from "../contexts/SignSectionContext";

function SignHead() {
  const { sign_section, handleChangeSection } =
    useContext(sign_section_context);

  const handleLogin = () => {
    handleChangeSection("signin");
  };

  return sign_section === "signin" ? (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-[clamp(2.5em,2vw,4em)] uppercase m-0">
        Login
      </h1>
      <h2 className="font-lighter uppercase text-green-700">
        Sign in to continue
      </h2>
    </div>
  ) : (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-[clamp(1em,2vw,3em)] uppercase m-0">
        Create new Account
      </h1>
      <h2 className="font-lighter text-green-700 w-full flex items-center justify-center flex-col">
        <span>Already have an account?</span>
        <p
          onClick={handleLogin}
          className="regular cursor-pointer underline hover:text-green-900 transition-all duration-200 ease-in-out"
        >
          Log here
        </p>
      </h2>
    </div>
  );
}

export default SignHead;
