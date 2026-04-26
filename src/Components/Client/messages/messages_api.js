import api from "../../utils/api_interceptor";
import { showError } from "../../utils/toastfy_notifications";

// loading chat profiles
export const load_profiles = async (user_id) => {
  const profiles = await api.get(
    `/get/chat_profiles/${encodeURIComponent(user_id)}`,
  );
  if (profiles.status !== 200) {
    showError(profiles?.response?.message || "Failed to load the messages");
  }
  return profiles?.data;
};
// loading chat messages
export const load_messages = async (sender_id, receiver_id) => {
  const messages = await api.get(
    `/get/chat_messages?sender_id=${encodeURIComponent(sender_id)}&receiver_id=${encodeURIComponent(receiver_id)}`,
  );
  if (profiles.status !== 200) {
    showError(messages?.response?.message || "Failed to load the messages");
  }
  return messages?.data;
};
