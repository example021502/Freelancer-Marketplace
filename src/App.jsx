import { lazy } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard/Dashboard";

const Signing_page = lazy(() => import("./Components/Sign_pages/Signing_page"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signing_page />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
