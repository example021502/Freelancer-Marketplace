import api from "../../../utils/api_interceptor";

export const NewPost = async (form) => {
  try {
    const res = await api.post("/post", form);
    return res?.data;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(e?.response?.data?.message || "Error creating post");
    return null;
  }
};
