import { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import Accounts from "./Accounts.jsx";
import Budgets from "./Budgets.jsx";

function MainPage(props) {
  return (
    <>
      <main className="w-full h-full bg-white py-5 overflow-y-auto">
        <div className="w-full flex">
          <div className="w-full">
            {props.activeTab === "Dashboard" && <Dashboard />}
            {props.activeTab === "Accounts" && <Accounts />}
            {props.activeTab === "Budgets" && <Budgets />}

          </div>
        </div>
      </main>
    </>
  );
}
export default MainPage;
