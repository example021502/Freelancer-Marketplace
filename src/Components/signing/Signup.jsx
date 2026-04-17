/* Signup.jsx 
   - Uses static ngrok domain for the backend
   - Sends 'password' which the backend will map to 'password_hash'
*/
import React, { useState } from "react";
import Label from "../common/Label";
import Input from "../common/Input";
import Button from "../common/Button";
import { Link, useNavigate } from "react-router-dom";
import { showError, showWarning } from "../utils/toastfy_notifications";
import SelectRole from "./SelectRole";
import SelectProfile from "./SelectProfile";
import Phone_number from "../common/Phone_number";
import { signup } from "../utils/backend_calls_functions";
import Textarea from "../common/Textarea";

function Signup() {
  //
  // Update this URL if your dashboard shows .app instead of .dev

  // signup elements
  const elements = [
    {
      label: "First Name",
      id: "first_name",
      placeholder: "Enter your first name here...",
      type: "text",
    },
    {
      label: "Last Name",
      id: "last_name",
      placeholder: "Enter your last name here...",
      type: "text",
    },
    {
      label: "Email",
      id: "email",
      placeholder: "Enter your email here...",
      type: "email",
    },
    { label: "Role", id: "role", placeholder: "", type: "select" },
    {
      label: "Mobile Number",
      id: "mobile_number",
      placeholder: "Enter your mobile here...",
      type: "tel",
    },
    {
      label: "Country",
      id: "country",
      placeholder: "Enter your country here...",
      type: "text",
    },
    {
      label: "Profile Picture",
      id: "profile_picture",
      placeholder: "Paste image link here(optional)...",
      type: "image",
    },
    {
      label: "Password",
      id: "password",
      placeholder: "Enter your password here...",
      type: "password",
    },
    {
      label: "Confirm Password",
      id: "confirm_password",
      placeholder: "Confirm password...",
      type: "password",
    },
    {
      label: "About (optional)",
      id: "bio",
      placeholder: "Tell us about yourself...",
      type: "textarea",
    },
  ];

  // is loading state
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    mobile_number: "",
    country: "",
    profile_picture: "",
    password: "",
    confirm_password: "",
  });

  const handleInputChange = (value, id) => {
    const val = id === "role" ? value.toLocaleLowerCase() : value;
    setForm((prev) => ({ ...prev, [id]: val }));
  };

  const handle_button_click = async (name) => {
    if (name === "login") return navigate("/");

    // Validation: Ignore profile_picture as it's optional
    const isEmpty = Object.keys(form).filter(
      (key) => form[key] === "" && key !== "profile_picture",
    );

    if (isEmpty.length > 0)
      return showError(`Error: fill these forms: ${isEmpty.join(", ")}`);

    if (form.password !== form.confirm_password)
      return showWarning("Passwords do not match!");

    // Remove confirm_password and keep 'password' for the backend to hash
    const { confirm_password, ...new_form } = form;
    setIsLoading(true);
    await signup(new_form, navigate, setIsLoading);
  };

  // input styles
  const input_styles =
    "w-full cursor-pointer p-3 md:p-2 mt-1 focus:outline-none focus:ring ring-green-800 rounded-xl border border-gray-400";
  const loading_styles = "pointer-events-none opacity-60";

  return (
    <div className="w-full text-sm h-dvh overflow-hidden p-4 items-center justify-center flex">
      <div className="w-full h-full md:w-[40%] lg:w-[38%] flex items-center md:p-6 justify-center flex-col rounded-3xl md:shadow-md space-y-4 md:border border-gray-300">
        <header className="w-full flex flex-col items-center justify-center">
          <Label
            text={"Sign Up"}
            class_name={"font-bold text-gray-400 text-[2em]"}
          />
          <Label
            text={"Lets get you started"}
            class_name={"text-[1em] font-light text-gray-400"}
          />
        </header>

        <div className="w-full overflow-y-auto no-scrollbar h-full px-1 py-2 flex flex-col space-y-4 items-center justify-start">
          {elements.map((el) => (
            <div
              key={el.id}
              className="flex-col items-start justify-start w-full"
            >
              <Label text={el.label} class_name={"text-gray-600"} />
              {el.type === "select" ? (
                <SelectRole
                  value={form.role}
                  element={el}
                  handleInputChange={handleInputChange}
                />
              ) : el.type === "image" ? (
                <div onClick={() => setExpand(true)} className="w-full">
                  {expand && (
                    <SelectProfile
                      setClose={setExpand}
                      pic={form.profile_picture}
                      handleInputChange={handleInputChange}
                      el={el}
                    />
                  )}
                  <Input
                    value={form.profile_picture}
                    read_only={true}
                    id={el.id}
                    placeholder={el.placeholder}
                    class_name={input_styles}
                    type={"text"}
                  />
                </div>
              ) : el.type === "tel" ? (
                <Phone_number
                  handleInputChange={handleInputChange}
                  default_value={form.mobile_number}
                  require={true}
                />
              ) : el.type === "textarea" ? (
                <Textarea
                  id={el.id}
                  handleInputChange={handleInputChange}
                  class_name={input_styles}
                  placeholder={el.placeholder}
                />
              ) : (
                <Input
                  auto_complete="new-password"
                  id={el.id}
                  onchange={handleInputChange}
                  placeholder={el.placeholder}
                  class_name={input_styles}
                  type={el.type}
                />
              )}
            </div>
          ))}
        </div>

        <div className="w-full grid grid-cols-2 items-center justify-center gap-4">
          <Button
            id="register"
            onclick={handle_button_click}
            text={isLoading ? "Registering..." : "Register"}
            class_name={`w-full py-1.5 rounded-xl bg-green-800 text-gray-200 ${isLoading ? `${loading_styles}` : ""}`}
          />
          <Button
            id="login"
            onclick={() => navigate("/")}
            text="Login"
            class_name={`border-green-800 border-2 w-full py-1.5 rounded-xl ${isLoading ? `${loading_styles}` : ""}`}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <Label
            text={"Already have an account?"}
            class_name={"text-gray-800/50"}
          />
          <Link to={"/"} className="border-b pb-1 px-2 border-green-800">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
