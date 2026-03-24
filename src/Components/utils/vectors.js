import { initials } from "@dicebear/collection";
import { avataaars } from "@dicebear/collection";
import { lorelei } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const getAvatar = (name) => {
  return createAvatar(initials, {
    seed: name,
    radius: 5,
    backgroundColor: "b6e3f4",
  }).toDataUri();
};
