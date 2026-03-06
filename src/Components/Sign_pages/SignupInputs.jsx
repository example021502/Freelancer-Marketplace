import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Label from "../common/Label";
import Icon from "../common/Icon";
import Input from "../common/Input";

function SignupInputs({ setSignupForm }) {
  const [show, setShow] = useState(false);

  const handleInputChange = (value, id) => {
    setSignupForm((prev) => ({ ...prev, [id]: value }));
  };

  const signin_elements = [
    {
      label: "Username",
      id: "username",
      type: "username",
      auto: "one-time-code",
    },
    { label: "Email", id: "email", type: "new-email", auto: "off" },
    {
      label: "Password",
      id: "password",
      type: "new-password",
      auto: "new-password",
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        // Unique key for the container ensures a fresh mount on toggle
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="w-full flex flex-col gap-4"
      >
        {signin_elements.map((el) => (
          <div key={el.id} className="w-full flex flex-col gap-1">
            <Label
              id={el.id}
              text={el.label}
              class_name="uppercase text-xs font-semibold tracking-wide"
            />
            <div className="w-full relative">
              <Input
                // Logic to handle password visibility toggle
                type={
                  el.id === "password" ? (show ? "text" : "password") : el.type
                }
                id={el.id}
                autocomplete={el.auto}
                name={el.id}
                onchange={handleInputChange}
                class_name="w-full py-1.5 px-2 border border-gray-400 rounded-lg"
              />

              {el.id === "password" && (
                <span
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute top-0 bottom-0 right-2 flex items-center justify-center cursor-pointer z-10"
                >
                  <Icon
                    icon={show ? "ri-eye-off-line" : "ri-eye-line"}
                    class_name="text-sm"
                  />
                </span>
              )}
            </div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

export default SignupInputs;
