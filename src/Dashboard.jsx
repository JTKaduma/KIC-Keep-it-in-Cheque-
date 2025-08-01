import { useState } from "react"
import DashboardCard from "./DashboardCard"

function Dashboard(){
    return(
        <section className="w-full px-[6vw]">
        <div className="flex flex-row justify-center items-center gap-4">
            <button className="w-13 h-13 text-2xl text-blue-400 font-bold flex flex-row justify-center items-center bg-transparent rounded-full border-2 border-solid border-blue-400 transition-colors ease-in-out hover:bg-blue-400 hover:text-rose-50" id="prevBtn">&#10094;</button>
            <span className="text-2xl font-bold w-[10vw] text-center py-[2vh]" id="currentMonth">Jul 2025</span>
            <button className="w-13 h-13 text-2xl text-blue-400 font-bold flex flex-row justify-center items-center bg-transparent rounded-full border-2 border-solid border-blue-400 transition-colors ease-in-out hover:bg-blue-400 hover:text-rose-50" id="prevBtn">&#10095;</button> 
        </div>
        <section className="flex flex-col">
          <div className="text-2xl py-[2vh] font-bold">
            <span>Overview</span>
          </div>
          <div className="flex flex-row gap-[3vw]">
            <DashboardCard name="Total Period Balance"/>
            <DashboardCard name="Total Period Expenses"/>
            <DashboardCard name="Total Period Income"/>
          </div>
        </section>
        </section>
    )
}
export default Dashboard