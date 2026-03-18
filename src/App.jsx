import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatchAll from "./CatchAll";
const Signup = lazy(() => import("./Components/signing/Signup"));
const Signin = lazy(() => import("./Components/signing/Signin"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<CatchAll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
