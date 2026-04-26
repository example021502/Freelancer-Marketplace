import api from "../../../utils/api_interceptor";
import { showError } from "../../../utils/toastfy_notifications";
// posting a new post
export const NewPost = async (form) => {
  const res = await api.post("/post", form);
  if (!res.success) return showError(res?.message || "Error creating post");
  return res?.result;
};
// getting all the posts
export const getAllPosts = async () => {
  const res = await api.get("/get/posts");
  if (!res.success || res.status !== 200)
    return showError(res?.message || "Error getting posts");
  console.log(res);
  return res?.data;
};

// getting more information about the post creator(freelancer)
export const getPostCreatorInformation = async (user_id) => {
  if (!user_id) return showError("Something went wrong! try again");
  const res = await api.get(`/get/post/userInformation/${user_id}`);
  if (!res.success)
    return showError(res?.message || "falied to load the user information");
  return res?.result;
};
