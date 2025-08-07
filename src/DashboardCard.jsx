import { useState } from "react";

function DashboardCard(props) {
  return (
    <div className="bg-blue-100 border-1 border-blue-400 rounded-md w-70 h-20 px-[1vw] py-[1vh]">
      <span className="text-xl">{props.name}</span>
      <p className="text-emerald-500 text-2xl">
        <span>₦{props.amt}</span>
      </p>
    </div>
  );
}
export default DashboardCard;
