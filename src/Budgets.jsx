import { useState, useMemo } from "react";

function Budgets() {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [budgetToDelete, setBudgetToDelete] = useState(null);
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [recurrence, setRecurrence] = useState("once");
  const [startDate, setStartDate] = useState("");
  const [budgetArray, setBudgetArray] = useState(
    JSON.parse(localStorage.getItem("budget")) || []
  );

  const recurrenceOptions = [
    { value: "once", label: "Once" },
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "biweekly", label: "Biweekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const budget = {
      budgetName,
      amount: parseFloat(amount),
      category,
      recurrence,
      startDate,
    };

    setBudgetArray((b) => {
      const updated = [...b, budget];
      localStorage.setItem("budget", JSON.stringify(updated));
      return updated;
    });

    setShowModal(false);
    setBudgetName("");
    setAmount("");
    setCategory("All Categories");
    setRecurrence("once");
    setStartDate("");
  };

  const budgetSummary = useMemo(() => {
    const txn = JSON.parse(localStorage.getItem("txn")) || [];

    const summaries = budgetArray.map((budget) => {
      const { category, amount } = budget;

      const matchedTxn = txn.filter((t) => {
        const txnDate = new Date(t.date);
        const startDate = new Date(budget.startDate);
        const endDate = new Date(startDate);
        switch (budget.recurrence) {
          case "yearly":
            endDate.setFullYear(startDate.getFullYear() + 1);
            break;
          case "monthly":
            endDate.setMonth(startDate.getMonth() + 1);
            break;
          case "biweekly":
            endDate.setDate(startDate.getDate() + 14);
            break;
          case "weekly":
            endDate.setDate(startDate.getDate() + 7);
            break;
          case "daily":
            endDate.setDate(startDate.getDate() + 1);
            break;
          case "once":
            endDate = null;
            break;
        }
        if (endDate) {
          return (
            (category === "All" ? true : t.type === category) &&
            txnDate >= startDate &&
            txnDate <= endDate
          );
        } else {
          return (
            (category === "All" ? true : t.type === category) &&
            txnDate >= startDate
          );
        }
      });

      const spentTxn = matchedTxn.reduce(
        (sum, txn) => sum + parseFloat(txn.amount),
        0
      );
      const remTxn = amount - spentTxn;
      const status = remTxn >= 0 ? "Within Budget" : "Over Budget";

      return {
        ...budget,
        spent: spentTxn,
        remaining: remTxn,
        status,
      };
    });

    return summaries;
  }, [budgetArray]);

  return (
    <section className="flex flex-col w-full px-[6vw]">
      <div className="text-2xl font-bold py-[2vh]">
        <span>Budgets</span>
      </div>
      <div>
        <button
          className="text-xl p-2 bg-blue-400 text-white border-none rounded-md cursor-pointer transition-colors ease-in-out hover:bg-blue-500"
          id="create"
          onClick={() => setShowModal(true)}
        >
          Create a New Budget
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
        {budgetSummary.map((summary) => (
          <div
            key={summary.budgetName}
            className={`p-6 rounded-lg shadow-lg border-2 transition-all duration-200 ${
              summary.status === "Within Budget"
                ? "border-emerald-400 bg-emerald-50"
                : "border-rose-400 bg-rose-50"
            }`}
          >
            <div className="flex justify-end">
              <button
                className="relative top-[-20px] right-[-15px] border-none bg-gray-300 p-1 opacity-80 text-xs rounded-full"
                onClick={() => {
                  setBudgetToDelete(summary);
                  setShowDeleteModal(true);
                }}
              >
                ✖
              </button>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg font-semibold text-blue-600">
                {summary.budgetName}
              </p>
              <span
                className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${
                  summary.status === "Within Budget"
                    ? "bg-emerald-200 text-emerald-800"
                    : "bg-rose-200 text-rose-800"
                }`}
              >
                {summary.status === "Within Budget" ? "✔" : "✖"}{" "}
                {summary.status}
              </span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Spent</span>
                <span className="font-bold text-gray-800">
                  ₦{summary.spent} / ₦{summary.amount}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    summary.status === "Within Budget"
                      ? "bg-emerald-400"
                      : "bg-rose-400"
                  }`}
                  style={{
                    width: `${Math.min(
                      (summary.spent / summary.amount) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-2">
              <span className="text-gray-500">Remaining</span>
              <span
                className={`font-bold ${
                  summary.status === "Within Budget"
                    ? "text-emerald-700"
                    : "text-rose-700"
                }`}
              >
                ₦{summary.remaining}
              </span>
            </div>
          </div>
        ))}
        {showDeleteModal && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 rounded-full">
            <div className="bg-white p-6 rounded shadow">
              <p>Are you sure you want to delete</p>
              <div className="flex gap-2 mt-4">
                <button
                  className="bg-gray-300 p-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white p-2"
                  onClick={() => {
                    const updated = budgetArray.filter(
                      (b) => b.budgetName !== budgetToDelete.budgetName
                    );

                    setBudgetArray(updated);
                    localStorage.setItem("budget", JSON.stringify(updated));
                    setShowDeleteModal(false);
                    setBudgetToDelete(null);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[320px] max-w-[50vw] w-full">
            <h2 className="text-xl font-bold mb-4 text-blue-500">New Budget</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Budget Name"
                value={budgetName}
                onChange={(e) => setBudgetName(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
                min={0}
              />
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="All">All Categories</option>
                <option value="Bills">Bills</option>
                <option value="Food">Food & Drink</option>
                <option value="Transport">Transport</option>
                <option value="Subscriptions">Subscriptions</option>
                <option value="Miscelleanious">Miscelleanious</option>
                <option value="Others">Others</option>
              </select>
              <h3 className="font-semibold mb-1 text-gray-700">
                Budget Period
              </h3>
              <label className="block mb-1 text-gray-600">Recurrence</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {recurrenceOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`recurrence-btn px-3 py-1 rounded border ${
                      recurrence === opt.value
                        ? "bg-blue-400 text-white border-blue-400"
                        : "bg-gray-100 text-gray-700 border-gray-300"
                    } transition-colors`}
                    value={opt.value}
                    onClick={() => setRecurrence(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <label
                className="block mb-1 font-medium text-gray-700"
                htmlFor="startDate"
              >
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Budgets;
