import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CatchAll from "./CatchAll";
const Signup = lazy(() => import("./Components/signing/Signup"));
const Signin = lazy(() => import("./Components/signing/Signin"));
const Home = lazy(() => import("./Components/Client/Home/Home"));
const Explore = lazy(() => import("./Components/Client/Explore/Explore"));
const Client = lazy(() => import("./Components/Client/Client"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="client/Home" element={<Client />}>
          <Route index element={<Home />} />
          <Route index element={<Explore />} />
        </Route>
        <Route path="*" element={<CatchAll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
