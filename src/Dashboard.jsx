import { useEffect, useMemo, useState } from "react";
import { Chart as ChartJS } from "chart.js/auto";
import DashboardCard from "./DashboardCard";
import { Bar, Doughnut } from "react-chartjs-2";

function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    getMonthlyData(currentMonth);
  }, [currentMonth]);

  function getMonthlyData(currentMonth) {
    const txnArray = JSON.parse(localStorage.getItem("txn")) || [];
    const monthlyTxn = txnArray.filter((txn) => {
      const txnDate = new Date(txn.date);
      return (
        txnDate.getMonth() === currentMonth.getMonth() &&
        txnDate.getFullYear() === currentMonth.getFullYear()
      );
    });
    const income = monthlyTxn
      .filter((txn) => txn.category === "Income")
      .reduce((acc, txn) => acc + parseFloat(txn.amount), 0);

    const expenses = monthlyTxn
      .filter((txn) => txn.category === "Expenses")
      .reduce((acc, txn) => acc + parseFloat(txn.amount), 0);

    const balance = income - expenses;
    setTotalBalance(balance);
    setTotalExpenses(expenses);
    setTotalIncome(income);
  }

  function prevMonth() {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() - 1);
      return newDate;
    });
  }

  function nextMonth() {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + 1);
      return newDate;
    });
  }

  return (
    <section className="w-full px-[6vw]">
      <div className="flex flex-row justify-center items-center gap-4">
        <button
          className="w-13 h-13 text-2xl text-blue-400 font-bold flex flex-row justify-center items-center bg-transparent rounded-full border-2 border-solid border-blue-400 transition-colors ease-in-out hover:bg-blue-400 hover:text-rose-50"
          onClick={prevMonth}
        >
          &#10094;
        </button>
        <span className="text-2xl font-bold w-[10vw] text-center py-[2vh]">
          {currentMonth.toLocaleString("default", {
            month: "short",
            year: "numeric",
          })}
        </span>
        <button
          className="w-13 h-13 text-2xl text-blue-400 font-bold flex flex-row justify-center items-center bg-transparent rounded-full border-2 border-solid border-blue-400 transition-colors ease-in-out hover:bg-blue-400 hover:text-rose-50"
          onClick={nextMonth}
        >
          &#10095;
        </button>
      </div>
      <section className="flex flex-col">
        <div className="text-2xl py-[2vh] font-bold">
          <span>Overview</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 wrap-normal gap-4">
          <DashboardCard name="Total Period Balance" amt={totalBalance} />
          <DashboardCard name="Total Period Expenses" amt={totalExpenses} />
          <DashboardCard name="Total Period Income" amt={totalIncome} />
        </div>
      </section>
      <section className="relative w-full h-100 flex items-center justify-center">
        <Doughnut
          data={{
            labels: [
              "Total Period Balance",
              "Total Period Expenses",
              "Total Period Income",
            ],
            datasets: [
              {
                label: "Period Overview",
                data: [totalBalance, totalExpenses, totalIncome],
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)",
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              title: {
                display: true,
                text: "Period Financial Breakdown",
              },
            },
          }}
        />
      </section>
    </section>
  );
}
export default Dashboard;
