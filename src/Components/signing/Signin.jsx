import React, { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { showError, showSuccess } from "../utils/toastfy_notifications";
import axios from "axios";
import { login } from "../utils/backend_calls_functions";

function Signin() {
  const elements = [
    { label: "Email", id: "email", placeholder: "Enter your email here..." },
    {
      label: "Password",
      id: "password",
      placeholder: "Enter your password here...",
    },
  ];
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (value, id) => {
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handle_button_click = async (name) => {
    if (name === "register") return navigate("signup");
    if (form.email === "") return showError("Email is missing!");
    if (form.password === "") return showError("Password is missing!");
    await login(form, navigate);
  };
  return (
    <div className="w-full text-sm h-dvh overflow-hidden p-4 items-center justify-center flex">
      <div className="w-full h-[80%] md:w-[40%] lg:w-[38%] flex items-center p-6 justify-center flex-col rounded-2xl  md:shadow-md space-y-6 md:border border-gray-300">
        <header className="w-full flex flex-col items-center justify-center">
          <Label
            text={"Login"}
            class_name={"font-bold text-gray-400 text-[2em]"}
          />
          <Label
            text={"Lets get you on stage"}
            class_name={"text-[1em] font-light text-gray-400"}
          />
        </header>
        <div className="w-full flex flex-col space-y-4 items-center justify-center">
          {elements.map((el) => {
            return (
              <div
                key={el.id}
                className="flex-col items-start justify-start w-full"
              >
                <Label text={el.label} class_name={"text-sm"} />
                <Input
                  onchange={handleInputChange}
                  id={el.id}
                  placeholder={el.placeholder}
                  class_name={
                    "w-full p-3 focus:outline-none focus:ring ring-green-800 md:p-2 rounded-xl border border-gray-400"
                  }
                  type={el.type}
                />
              </div>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-2 items-center justify-center gap-4">
          {[
            { label: "Login", id: "login" },
            { label: "Register", id: "register" },
          ].map((btn) => {
            return (
              <Button
                key={btn.id}
                id={btn.id}
                onclick={handle_button_click}
                text={btn.label}
                class_name={`w-full py-1.5 rounded-xl md:text-[1em] text-lg font-lighter items-center justify-center flex ${btn.id === "login" ? "bg-green-800 text-gray-200" : "border-green-800 border-2"}`}
              />
            );
          })}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <Label
            text={"Already have an account?"}
            class_name={"text-gray-800/50"}
          />
          <Link to={"signup"} className="border-b px-2 pb-1 border-green-800">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
