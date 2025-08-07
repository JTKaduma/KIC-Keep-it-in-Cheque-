import { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import Accounts from "./Accounts.jsx";
import Budgets from "./Budgets.jsx";

function MainPage(props) {
  return (
    <>
      <main className="w-[90%] h-screen lg:w-4/5 bg-white py-5 overflow-y-auto">
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
