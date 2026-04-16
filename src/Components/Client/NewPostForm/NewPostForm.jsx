import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../common/Header";
import Input from "../../common/Input";
import Label from "../../common/Label";
import { get_user_data } from "../../utils/backend_calls_functions";
import { useQuery } from "@tanstack/react-query";
import { showSuccess } from "../../utils/toastfy_notifications";
import { NewPost } from "./PostingBackendCalls/posts";
import Button from "../../common/Button";
import Textarea from "../../common/Textarea";
function NewPostForm({ setClosing }) {
  // user details state
  const [user, setUser] = useState({});

  //   posting status
  const [posting, setPosting] = useState(false);
  useQuery({
    queryKey: ["user"],
    queryFn: get_user_data(),
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (error) => {
      console.log(error);
    },
    onLoading: () => {
      return (
        <div
          className={
            "w-full flex items-center justify-center inset-0 absolute top-0 left-0 p-4"
          }
        >
          <Label text={"Loading"} class_name={"font-bold text-lg"} />
        </div>
      );
    },
  });

  // new post form
  const [postForm, setPostForm] = useState({
    creator_id: user?.id || "",
    title: "",
    description: "",
    budget: "",
    discount: "",
  });

  // post elements
  const elements = [
    {
      label: "Title",
      placeholder: "Financial Manager",
      id: "title",
      type: "text",
    },

    { label: "Cost", placeholder: "$ 2000", id: "budget" },
    { label: "Discount(%) (optional)", placeholder: "0.00", id: "discount" },
  ];

  // styles
  const input_styles =
    "w-full font-lighter rounded-xl py-1 px-2 border border-gray-200";
  const label_styles = "font-semibold text-sm";
  const button_styles = "w-full py-2 rounded-xl text-gray-200 font-semibold";

  //   handle filling the form
  const handleInputChange = (value, id) => {
    setPostForm((prev) => ({ ...prev, [id]: value }));
  };

  //   handle posting the form to database
  const handlePostingForm = () => {
    const empty = Object.keys(postForm).filter(
      (key) => postForm[key] === "" && key !== "discount",
    );
    if (empty.length > 0) return showError(`Fill ${empty.join(", ")}`);

    try {
      setPosting(true);
      const res = NewPost(NewPostForm);
      showSuccess(res.message || "Post created successfully");
      setPosting(false);
      setClosing(false);
    } catch (e) {
      setPosting(false);
      console.log(e.response.data.message || "Error creating post");
    }
  };
  //   handle clearing the form
  const handleClearingForm = () => {
    setPostForm({
      creator_id: user?.id || "",
      title: "",
      description: "",
      budget: "",
      discount: "",
    });
  };

  return createPortal(
    <div
      onClick={() => setClosing(false)}
      className="absolute top-0 left-0 p-4 inset-0 flex flex-col items-center justify-center bg-gray-200/10 z-2000"
    >
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
          exit={{ opacity: 0, scale: 0.95 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full md:w-80 lg:w-100 p-4 rounded-xl shadow-lg bg-gray-50 gap-4 flex flex-col border-gray-200/40 border-2"
        >
          <Header
            main_heading={"New Post"}
            sub_heading={"post new item"}
            setClosing={setClosing}
          />
          <div className="grid grid-cols-2 gap-4">
            {elements.map((el) => {
              return (
                <div
                  key={el.id}
                  className="w-full flex flex-col items-start justify-start gap-1"
                >
                  <Label text={el.label} class_name={label_styles} />
                  <Input
                    id={el.id}
                    onchange={handleInputChange}
                    class_name={input_styles}
                    placeholder={el.placeholder}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <Label text={"Description"} />
            <Textarea
              handleInputChange={handleInputChange}
              class_name={input_styles}
              id={"description"}
              placeholder={"Manage all your financail status in one place"}
            />
          </div>
          <div className="w-full pt-4 flex items-center justify-end gap-4">
            <Button
              id={"clear"}
              text={"Clear Form"}
              class_name={`${button_styles} bg-red-600`}
              onclick={handleClearingForm}
            />
            <Button
              id={"post"}
              text={posting ? "Posting..." : "+ Post"}
              class_name={`${button_styles} bg-green-600`}
              onclick={handlePostingForm}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>,
    document.body,
  );
}

export default NewPostForm;
