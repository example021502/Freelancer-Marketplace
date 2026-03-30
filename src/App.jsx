import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const CatchAll = lazy(() => import("./CatchAll"));
const ClientProtectedRoutes = lazy(
  () => import("./Components/protectedRoutes/ClientProtectedRoutes"),
);
const Signup = lazy(() => import("./Components/signing/Signup"));
const Signin = lazy(() => import("./Components/signing/Signin"));
const Home = lazy(() => import("./Components/Client/Home/Home"));
const Client = lazy(() => import("./Components/Client/Client"));
const Messages = lazy(() => import("./Components/Client/messages/Messages"));
const AssignedProjects = lazy(
  () => import("./Components/AssignedProjects/AssignedProjects"),
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<ClientProtectedRoutes />}>
          <Route path="client" element={<Client />}>
            <Route index element={<Home />} />
            <Route path="explore" element={<Home />} />
            <Route path="messages" element={<Messages />} />
            <Route path="assigned_projects" element={<AssignedProjects />} />
          </Route>
          <Route path="*" element={<CatchAll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
