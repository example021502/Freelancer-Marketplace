import React from "react";
import Label from "../../common/Label";
import { motion, AnimatePresence } from "framer-motion";
function Categories() {
  const categories = [
    {
      icon: "",
      label: "Development & IT",
      id: "development_it",
      comment: "Web, Mobile, Game Dev, Software Engineering, AQ etc...",
    },
    {
      label: "Design & Creative",
      id: "design_creative",
      comment:
        "UI/UX, Graphic Design, Branding, Illustration, Video Editing etc...",
    },
    {
      label: "Writing & Translation",
      id: "writing_translation",
      comment:
        "Content Writing, Copywriting, Technical Writing, Proofreading etc...",
    },
    {
      label: "Digital Marketing",
      id: "digital_marketing",
      comment: "SEO, Social Media Management, SEM, Email Marketing etc...",
    },
    {
      label: "Admin & Customer  Support",
      id: "admin_customer_support",
      comment: "Virtual Assistant, Data Entry, Tech Support etc...",
    },
    {
      label: "Finance & Legal",
      id: "finance_legal",
      comment: "Accounting, Business Consulting, Contract Law etc...",
    },
  ];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        exit={{ opacity: 0, y: 10 }}
        className="w-full text-sm flex flex-col items-start justify-start"
      >
        <Label
          text={"Categories"}
          class_name={
            "font-lighter border-b-2 border-green-800/20 w-full mb-2 text-lg"
          }
        />
        <div className="w-full text-sm flex-wrap font-lighter rounded-xl flex flex-row items-center justify-start gap-2">
          {categories.map((cart) => {
            return (
              <div
                key={cart.id}
                className="py-2 px-3 ronded-xl hover:bg-gray-50 border border-green-800/40 cursor-pointer transition-all duration-150 ease-in-out hover:scale-[1.02] rounded-xl flex flex-row items-center justify-start space-x-2"
              >
                <Label text={cart.label} class_name={"pointer-events-none"} />
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Categories;
