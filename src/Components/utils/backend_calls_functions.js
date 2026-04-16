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
    setLoading(false);
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

//get_information_common by table name, target_field and field value
export const get_information_common = async (
  table_name,
  target_field,
  target_value,
) => {
  try {
    const res = await api.get(
      `/get/data/${table_name}/${target_field}/${target_value}`,
    );
    return res?.data?.result;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(
      e?.response?.data?.message || "Couldn't load data for this post!",
    );
    return null;
  }
};

// get projects by email and role for assigned projects display
export const get_all_projects_by_email_and_role = async (email, role) => {
  try {
    const res = await api.get(
      `/get/user_projects?email=${encodeURIComponent(email)}&role=${encodeURIComponent(role)}`,
    );
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

// get_personal information using user_id
export const get_personal_information = async (user_id) => {
  try {
    const response = await api.get(`/get/data/users/user_id/${user_id}`);
    return response?.data?.result;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(
      e?.response?.data?.message ||
        "Could not load the personal information for this user!",
    );
    return null;
  }
};

// getting all payments by email
export const getPaymentsByEmail = async (email) => {
  try {
    const response = await api.get(
      `/get/payments?email=${encodeURIComponent(email)}`,
    );
    return response?.data?.result;
  } catch (e) {
    console.log(`Error: ${e}`);
    showError(
      e?.response?.data?.message ||
        "Could not load the payments for this user!",
    );
    return null;
  }
};
