import { v4 as uuidv4 } from "uuid";
import { showError } from "./toastfy_notifications";

export const getUserId = () => {
  // Generate a random user ID (you can replace this with a more robust method if needed)
  return `${uuidv4()}`;
};

export const chat_profiles = [
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
  {
    chat_id: getUserId(),
    username: "Charles",
    about: "Wagwaan",
    icon: "ri-user-line",
    lastActive: new Date().toLocaleString(),
  },
];

// dummy messages
export const messages = [
  {
    sender_id: "sender",
    receiver_id: "receiver",
    message: "Bhooo",
    date: new Date().toLocaleString(),
  },
  {
    sender_id: "reciver",
    receiver_id: "sender",
    message: "Helloo",
    date: new Date().toLocaleString(),
  },
  {
    sender_id: "reciever",
    receiver_id: "",
    message: "Hey",
    date: new Date().toLocaleString(),
  },
  {
    sender_id: "sender",
    receiver_id: "receiver",
    message: "Helloo",
    date: new Date().toLocaleString(),
  },
];
