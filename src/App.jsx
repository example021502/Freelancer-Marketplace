import { lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  () => import("./Components/Client/AssignedProjects/AssignedProjects"),
);
const PaymentBills = lazy(
  () => import("./Components/Client/PaymentBills/PaymentBills"),
);
const Settings = lazy(() => import("./Components/Client/Settings/Settings"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
              <Route path="payments_bills" element={<PaymentBills />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<CatchAll />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
