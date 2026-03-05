import React from "react";
// We import the icons we want to use elsewhere, but this component stays generic
import * as LucideIcons from "lucide-react";

/**
 * A reusable Icon component
 * @param {string} name - The name of the icon (e.g., "User", "Trash")
 * @param {string} color - CSS color string
 * @param {number} size - Size in pixels
 * @param {string} class_name - Additional CSS classes (for Tailwind, etc.)
 */
const Icon = ({ name, color = "currentColor", size = 24, class_name = "" }) => {
  // Find the specific icon component from the Lucide library by its string name
  const LucideIcon = LucideIcons[name];

  // If the icon name doesn't exist, return null to avoid crashing the app
  if (!LucideIcon) {
    console.warn(`Icon "${name}" does not exist in lucide-react`);
    return null;
  }

  return (
    <LucideIcon
      color={color}
      size={size}
      className={class_name}
      strokeWidth={2} // Setting a default global stroke thickness
    />
  );
};

export default Icon;
