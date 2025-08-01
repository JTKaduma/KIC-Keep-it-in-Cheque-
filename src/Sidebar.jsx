import { useState } from "react";
import SidebarButton from "./SidebarButton.jsx";

function Sidebar({ activeTab, tabs, onTabClick }) {
  return (
    <>
      <aside className="relative flex flex-col gap-y-2 w-1/5 h-screen bg-blue-400 py-5">
        <div className="text-4xl font-bold text-rose-50 px-[3vw] py-[15px]">
          <span className="cursor-pointer">KIC</span>
        </div>
        <div className="flex flex-col items-left text-left">
          {tabs.map((tab, index) => (
          <SidebarButton
            key={index}
            name={tab}
            onTabClick={onTabClick}
            isActive={activeTab === tab}
          />
        ))}
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
