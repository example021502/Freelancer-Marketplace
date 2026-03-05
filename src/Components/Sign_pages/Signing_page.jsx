import React, { useContext, useState } from "react";
import Button from "../common/Button";
import SignHead from "./SignHead";
import SignInputs from "./SignInputs";
import { sign_section_context } from "../contexts/SignSectionContext";
import { logged_user_context } from "../contexts/LoggedUserContext";
import { users_context } from "../contexts/UsersDataContext";
import { useNavigate } from "react-router-dom";
import Label from "../common/Label";
import axios from "axios";

function Signing_page() {
  const navigate = useNavigate();
  const { users, create_user } = useContext(users_context);
  const { sign_section } = useContext(sign_section_context);

  const { set_logged_username } = useContext(logged_user_context);

  const [error, setError] = useState({
    type: "",
    text: "",
  });
  const [signinForm, setSigninForm] = useState({
    username: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    user_id: "",
    username: "",
    email: "",
    date_joined: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      day: "numeric",
      month: "numeric",
    }),
    password: "",
  });

  const { handleChangeSection } = useContext(sign_section_context);

  const clearErorr = () => {
    setTimeout(() => {
      setError({ type: "", text: "" });
    }, 1000);
  };

  const handleBtnClick = (id) => {
    if (sign_section === "signin") {
      return;
    }
    if (id === "button") return handleChangeSection("signup");
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    const isEmpty = signinForm.username === "" || signinForm.password === "";
    if (isEmpty) {
      setError({
        type: "error",
        text: "Enter Username and Password to Continue...",
      });
      clearErorr();
      return;
    }
    setError({ type: "success", text: "Validating..." });
    axios
      .post("http://8080/api/login", signinForm)
      .then((res) => {
        const response = res.data;
        setError({ type: response.type, text: response.text });
        if (response.id === "proceed")
          setTimeout(() => navigate("dashboard"), 1000);
      })
      .catch((error) => {
        setError({ type: "error", text: error });
      });
  };

  return (
    <div className="w-full h-dvh relative p-2 hidden md:flex flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/QFqvWz33/bg.png"
        className="w-full h-full absolute -z-1 top-0 left-0 inset-0"
      />
      <div className="min-w-[36%] flex flex-col items-center justify-center gap-8 p-8 rounded-2xl overflow-hidden h-full bg-white">
        {error.text !== "" && (
          <Label
            class_name={`w-full px-2 py-1 rounded-xl ${error.type === "error" ? "text-red-700 bg-red-50" : "text-green-700 bg-green-50"}`}
          />
        )}
        <SignHead />
        <form
          onSubmit={(e) => handleFormSubmission(e)}
          className="gap-6 flex flex-col items-center justify-center w-full"
        >
          <SignInputs
            setSigninForm={setSigninForm}
            setSignupForm={setSignupForm}
          />
          <div className="w-full flex flex-row items-center justify-center gap-4">
            {[
              {
                label: sign_section === "signin" ? "Log in" : "Create",
                id: "submit",
                color: "bg-linear_gradient text-white",
              },
              {
                label: sign_section === "signin" ? "Create Account" : "Log in",
                id: "create_account",
                color: "",
              },
            ].map((item) => {
              return (
                <Button
                  onBtnClick={handleBtnClick}
                  key={item.id}
                  id={item.id}
                  type={item.id}
                  text={item.label}
                  class_name={`font-semibold py-2 border w-full ${item.color}`}
                />
              );
            })}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signing_page;
