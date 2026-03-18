import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import "remixicon/fonts/remixicon.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer
      autoClose={2000}
      position="top-right"
      hideProgressBar={true}
    />
  </StrictMode>,
);
