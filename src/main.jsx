import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import App from "./App.jsx";
import ContextRender from "./Components/ContextRender.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextRender />
  </StrictMode>,
);
