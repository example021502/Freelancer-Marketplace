import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "../common/Input";
import Label from "../common/Label";
import { sign_section_context } from "../contexts/SignSectionContext";
import Icon from "../common/Icon";

function SignInputs({ setSigninForm, setSignupForm }) {
  const { sign_section } = useContext(sign_section_context);
  const [show, setSHow] = useState(false);
  const Signing_page_elements = [
    {
      label: "Username",
      placeholder: "Enter username",
      id: "username",
    },
    {
      label: "Password",
      placeholder: "Enter Password",
      id: "password",
    },
  ];
  const sign_up_elements = [
    {
      label: "Email",
      placeholder: "Enter email",
      id: "email",
    },
    {
      label: "Username",
      placeholder: "Enter username",
      id: "username",
    },
    {
      label: "Password",
      placeholder: "Enter Password",
      id: "password",
    },
  ];

  const handleInputChange = (value, id) => {
    sign_section === "signin"
      ? setSigninForm((prev) => ({ ...prev, [id]: value }))
      : setSignupForm((prev) => ({ ...prev, [id]: value }));
  };

  const elements =
    sign_section === "signin" ? Signing_page_elements : sign_up_elements;

  return elements.map((item) => {
    return (
      <AnimatePresence key={item.id}>
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          className="w-full flex gap-1 flex-row flex-wrap items-start justify-start"
        >
          <Label
            id={"text"}
            text={item.label}
            class_name="uppercase text-xs font-semibold tracking-wide"
          />
          <div className="w-full relative">
            <Input
              type={show ? "text" : "password"}
              id={item.id}
              onchange={handleInputChange}
              placeholder={item.placeholder}
              class_name="w-full py-1.5 px-2 z-1 border border-gray-400 rounded-lg"
            />
            {item.id === "password" && (
              <span
                onClick={() => setSHow((prev) => !prev)}
                className="absolute top-0 z-2  bottom-0 right-2 flex items-center justify-center"
              >
                <Icon name={show ? "EyeOff" : "Eye"} />
              </span>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  });
}

export default SignInputs;
