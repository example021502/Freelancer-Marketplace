import { v4 as uuidv4 } from "uuid";

export const getUserId = () => {
  // Generate a random user ID (you can replace this with a more robust method if needed)
  return `${uuidv4()}`;
};
