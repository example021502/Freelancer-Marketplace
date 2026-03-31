import { showError, showSuccess } from "../utils/toastfy_notifications";
import api from "./api_interceptor";

// getting projects
export const get_projects = async () => {
  try {
    const res = await api.get("/get/projects");
    return res.data;
  } catch (e) {
    console.log(`Error: ${e}`);
    return showError(
      e?.response?.data?.message || "Could not load the projects!",
    );
  }
};

// login in
export const login = async (form, navigate, setLoading) => {
  try {
    const res = await api.post("/login", form);
    localStorage.setItem("token", res?.data?.token);
    const { message } = res?.data;
    showSuccess(message);
    sessionStorage.setItem("log", true);
    navigate("/client");
  } catch (e) {
    setLoading(false);
    console.log(`Error: ${e}`);
    const message =
      e?.response?.data?.message || `Error: Something went wrong! ${e}`;
    showError(message);
  }
};

// singing up
export const signup = async (new_form, navigate) => {
  try {
    const res = await api.post("/add/users", new_form);
    const message = res?.data?.message;
    showSuccess(message);
    navigate("/");
  } catch (e) {
    const message = e?.response?.data?.message;
    console.log(`Error: ${e}`);
    return showError(message);
  }
};

// accessing user data from token
export const get_user_data = async () => {
  try {
    const res = await api.get("/userData");
    return res?.data?.user;
  } catch (e) {
    console.log(`Error: ${e}`);
    return showError(
      e?.response?.data?.message || "Could not load the user data!",
    );
  }
};

// get user by id and table name
export const getUser = async (table, id, fields = [], target_field = "") => {
  try {
    const clean_fields = fields.length > 0 ? fields.join(",") : "";
    const res = await api.get(
      `http://localhost:8080/api/get/${table}/${id}?fields=${encodeURIComponent(clean_fields)}&targetField=${encodeURIComponent(target_field)}`,
    );
    const status = res?.data?.status;
    if (status === 500) return showError(res?.data?.message);
    const data = res?.data?.result;
    return data;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(
      e?.response?.data?.message || "Could not load the user for this post!",
    );
    return null;
  }
};

export const get_all_projects_by_email_and_role = async (email, role) => {
  try {
    const res = await api.get(
      `/get/user_projects?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`,
    );
    const status = res?.data?.status;
    if (status === 500) return showError(res?.data?.message);
    return res?.data?.result;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(
      e?.response?.data?.message ||
        "Could not load the projects for this user!",
    );
    return null;
  }
};
