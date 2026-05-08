import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Icon from "../../common/Icon";
import Label from "../../common/Label";
import Image from "../../common/Image";
import Textarea from "../../common/Textarea";

function Upload({ images, setNextForm, setPostForm }) {
  // handle uploading images
  const handleUploading = (e) => {
    e.preventDefault();
    setPostForm((prev) => {
      if (prev.images.length >= 3) return prev;
      const pastedData = e.clipboardData.getData("text");
      return {
        ...prev,
        images: [...prev.images, pastedData],
      };
    });
  };

  // style
  const image_container_style =
    "w-full rounded-xl min-h-25 border flex items-center justify-center border-gray-300 shadow-sm";

  return (
    <AnimatePresence mode="wait">
      <div className={"w-full flex items-start justify-start"}>
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <Label
            text={"Upload images:"}
            class_name={"text-lg font-semibold tracking-wide"}
          />
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeInOut", type: "tween" }}
            className={`w-full flex flex-row gap-4 items-center h-fit justify-between`}
          >
            <textarea
              onPaste={handleUploading}
              placeholder="Paste your image links here...(max 3)"
              className={`w-full flex-2 border h-30 rounded-xl border-gray-400 p-4`}
              defaultValue={images.join("\n")}
            />
          </motion.div>
        </div>
        {/* upload from host */}
      </div>
    </AnimatePresence>
  );
}

export default Upload;
