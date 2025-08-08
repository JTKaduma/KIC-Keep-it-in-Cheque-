import { useState } from "react";
import MainPage from "./MainPage.jsx";
import Sidebar from "./Sidebar.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const tabs = ["Dashboard", "Accounts", "Budgets"];
  return (
    <div className="flex flex-row w-full h-screen">
      <Sidebar tabs={tabs} onTabClick={setActiveTab} activeTab={activeTab} />
      <MainPage activeTab={activeTab} />
    </div>
  );
}

export default App;
