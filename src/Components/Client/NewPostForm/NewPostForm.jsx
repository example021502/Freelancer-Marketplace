{
  /*
  LEFT OF CREATING THE IMAGES STATE FOR EACH POST
  */
}

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../../common/Header";
import Input from "../../common/Input";
import Image from "../../common/Image";
import Label from "../../common/Label";
import { get_user_data } from "../../utils/backend_calls_functions";
import { showSuccess, showError } from "../../utils/toastfy_notifications";
import { NewPost } from "./PostingBackendCalls/posts";
import Button from "../../common/Button";
import Textarea from "../../common/Textarea";
import Icon from "../../common/Icon";
function NewPostForm({ setClosing }) {
  // tracking loading posting status
  const [posting, setPosting] = useState(false);

  // user data
  const [user, setUser] = useState({});
  // images
  const [images, setImages] = useState([]);

  // image link state
  const [imgLink, setImgLink] = useState("");

  useEffect(() => {
    (async () => {
      const data = await get_user_data();
      setUser(data);
    })();
  }, []);

  // new post form
  const [postForm, setPostForm] = useState({
    creator_id: user?.id,
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

    { label: "Cost($)", placeholder: "2000", id: "budget", type: "number" },
    {
      label: "Discount(%) (optional)",
      placeholder: "0.00",
      id: "discount",
      type: "number",
    },
  ];

  // styles
  const input_styles =
    "w-full font-lighter focus:outline-none focus:ring ring-gray-400 rounded-xl py-1 px-2 border border-gray-400";
  const label_styles = "font-semibold text-sm";
  const button_styles = `w-full py-2 rounded-xl text-gray-200 font-semibold ${posting ? "pointer-pointer-events-none opacity-60" : ""}`;

  //   handle filling the form
  const handleInputChange = (value, id) => {
    setPostForm((prev) => ({ ...prev, [id]: value }));
  };

  //   handle posting the form to database
  const handlePostingForm = async () => {
    console.log(user);
    if (posting) return;
    if (!postForm.creator_id) return showError("Failed : User Error");
    const empty = Object.keys(postForm).filter(
      (key) =>
        postForm[key] === "" && key !== "discount" && key !== "creator_id",
    );
    if (empty.length > 0) return showError(`Fill ${empty.join(", ")}`);

    try {
      setPosting(true);
      const res = await NewPost(postForm);
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

  // handle uploading
  const handleImageChanges = (e) => {
    console.log(e.target.files);
    setImages(e.target.files);
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
          <div className="grid grid-cols-2 gap-6">
            {elements.map((el) => {
              return (
                <div
                  key={el.id}
                  className="w-full flex flex-col items-start justify-start gap-1"
                >
                  <Label text={el.label} class_name={label_styles} />
                  <Input
                    id={el.id}
                    value={postForm[el.id]}
                    onchange={handleInputChange}
                    class_name={input_styles}
                    placeholder={el.placeholder}
                    type={el.type}
                  />
                </div>
              );
            })}
            <div className="w-full text-[10px] border cursor-pointer border-gray-400 rounded-xl flex flex-row items-center justify-center gap-2">
              <input
                onChange={(e) => handleImageChanges(e)}
                type="file"
                multiple
                max={3}
                id="image-uploader"
                className="hidden"
              />
              <label
                htmlFor="image-uploader"
                className="w-full h-full rounded-xl flex items-center justify-center"
              >
                {images.length === 0 ? (
                  <Icon
                    icon={"ri-upload-cloud-2-line"}
                    class_name={"text-2xl font-light"}
                  />
                ) : (
                  images.map((i) => i)
                )}
              </label>
            </div>
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
