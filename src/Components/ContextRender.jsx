import React, { Suspense } from "react";
import App from "../App";
import SignSectionContext from "../Components/contexts/SignSectionContext";
import Label from "./common/Label";
import LoggedUserContext from "./contexts/LoggedUserContext";
import UsersDataContext from "./contexts/UsersDataContext";
import DashboardProvider from "./contexts/DashboardContext";

// main
function ContextRender() {
  // fallback
  const Fallback = () => {
    return (
      <div className="inset-0 flex items-center justify-center bg-white">
        <Label
          class_name="font-semibold text-lg"
          _text={"Loading Application..."}
        />
      </div>
    );
  };
  return (
    <Suspense fallback={<Fallback />}>
      <DashboardProvider>
        <UsersDataContext>
          <LoggedUserContext>
            <SignSectionContext>
              <App />
            </SignSectionContext>
          </LoggedUserContext>
        </UsersDataContext>
      </DashboardProvider>
    </Suspense>
  );
}

export default ContextRender;
