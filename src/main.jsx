import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import "remixicon/fonts/remixicon.css";

import ContextRender from "./Components/ContextRender.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextRender />
  </StrictMode>,
);
