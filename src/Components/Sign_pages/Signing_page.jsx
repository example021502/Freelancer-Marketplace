import React, { useContext, useState } from "react";
import Button from "../common/Button";
import SignHead from "./SignHead";
import { sign_section_context } from "../contexts/SignSectionContext";
import { logged_user_context } from "../contexts/LoggedUserContext";
import { users_context } from "../contexts/UsersDataContext";
import { useNavigate } from "react-router-dom";
import Label from "../common/Label";
import axios from "axios";
import SigninInputs from "./SigninInputs";
import SignupInputs from "./SignupInputs";

function Signing_page() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const navigate = useNavigate();
  const { sign_section, handleChangeSection } =
    useContext(sign_section_context);
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
    username: "",
    email: "",
    password: "",
  });

  const clearError = () => {
    setTimeout(() => {
      setError({ type: "", text: "" });
    }, 3000); // Increased time slightly so users can actually read the error
  };

  const handleBtnClick = (id) => {
    if (id === "button") {
      sign_section === "signin"
        ? handleChangeSection("signup")
        : handleChangeSection("signin");
    }
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    if (sign_section === "signin") {
      if (!signinForm.username || !signinForm.password) {
        setError({
          type: "error",
          text: "Enter Username and Password to Continue...",
        });
        clearError();
        return;
      }

      if (signinForm.email) {
        const isValid = regex.test(signinForm.email);
        if (!isValid) setError({ type: "error", text: "⚠ Email is not valid" });
        return clearError();
      }

      setError({ type: "success", text: "Validating..." });

      axios
        .post("http://localhost:8080/api/login", signinForm)
        .then((res) => {
          const response = res.data;
          if (response.type === "error") {
            setError({
              type: response.type,
              text: response.text,
            });
            return clearError();
          }

          set_logged_username(signinForm.username);
          clearError();
          setTimeout(() => navigate("dashboard"), 1000);
        })
        .catch((err) => {
          // Safeguard: Ensure we extract a string, not an object
          const msg =
            err.response?.data?.text ||
            err.response?.data?.sqlMessage ||
            err.message ||
            "Login failed";
          setError({ type: "error", text: String(msg) });
          clearError();
        });
    } else {
      // Signup Logic
      const { username, email, password } = signupForm;
      if (!username || !email || !password) {
        setError({ type: "error", text: "All fields are required" });
        return clearError();
      }

      if (email) {
        const isValid = regex.test(email);
        if (!isValid) setError({ type: "error", text: "⚠ Email is not valid" });
        return clearError();
      }
      if (username.length < 2 || username.length > 10) {
        setError({
          type: "error",
          text: "⚠ Username should be atleast 2 character and atmost 10 charaters",
        });
        return clearError();
      }

      const date_joined = new Date();
      const formatedDate = date_joined.toISOString().split("T")[0];
      const custom_user_id = `${username.substring(0, 6)}_${formatedDate.replace(/-/g, "")}`;

      const newUser = {
        ...signupForm,
        date_joined: formatedDate,
        user_id: custom_user_id,
      };
      setError({ type: "success", text: "Validating..." });

      axios
        .post("http://localhost:8080/api/add/Users", newUser)
        .then((res) => {
          setError({
            type: "success",
            text: res.data.text || "Account created successfully!",
          });
          clearError();
          setTimeout(() => handleChangeSection("signin"), 1500);
        })
        .catch((err) => {
          // Safeguard: Extracting message from the SQL error object found in your logs
          const msg =
            err.response?.data?.sqlMessage ||
            err.response?.data?.text ||
            err.message ||
            "Signup failed";
          setError({ type: "error", text: String(msg) });
          clearError();
        });
    }
  };

  return (
    <div className="w-full h-dvh relative p-2 hidden md:flex flex-col items-center justify-center bg-white">
      <div className="min-w-[36%] flex flex-col items-center justify-center gap-8 p-8 rounded-2xl overflow-hidden h-full">
        {error.text !== "" && (
          <Label
            text={String(error.text)} // Force string conversion to prevent crashes
            class_name={`w-full px-2 py-1 rounded-xl ${
              error.type === "error"
                ? "text-red-700 bg-red-50"
                : "text-green-700 bg-green-50"
            }`}
          />
        )}

        <SignHead />

        <form
          onSubmit={handleFormSubmission}
          className="gap-6 flex flex-col items-center justify-center w-full"
        >
          {sign_section === "signin" ? (
            <SigninInputs setSigninForm={setSigninForm} />
          ) : (
            <SignupInputs setSignupForm={setSignupForm} />
          )}
          <div className="w-full flex flex-row items-center justify-center gap-4">
            <Button
              onBtnClick={handleBtnClick}
              id="submit"
              type="submit"
              text={sign_section === "signin" ? "Log in" : "Create"}
              class_name="font-semibold py-2 border w-full bg-linear_gradient text-white"
            />
            <Button
              onBtnClick={handleBtnClick}
              id="button"
              type="button"
              text={sign_section === "signin" ? "Create Account" : "Log in"}
              class_name="font-semibold py-2 border w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signing_page;
