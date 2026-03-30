import { lorelei, initials, avataaars, icons } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

// avatar
export const getAvatar = (name) => {
  return createAvatar(lorelei, {
    seed: name,
    radius: 5,
    backgroundColor: "b6e3f4",
  }).toDataUri();
};

// initials
export const getInitials = (name) => {
  return createAvatar(initials, {
    seed: name,
    radius: 5,
    backgroundColor: ["a2c593", "b6e3f4", "008da2"],
  }).toDataUri();
};

// icons
export const getIcon = (name) => {
  return createAvatar(icons, {
    seed: name,
    radius: 50,
    backgroundColor: "b6e3f4",
  }).toDataUri();
};
