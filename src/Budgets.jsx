import { useState } from "react";

function Budgets() {
  const [showModal, setShowModal] = useState(false);
  const [budgetName, setBudgetName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [recurrence, setRecurrence] = useState("once");
  const [startDate, setStartDate] = useState("");
  const [budgetData, setBudgetData] = useState()

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



    
    setShowModal(false);
    setBudgetName("");
    setAmount("");
    setCategory("All Categories");
    setRecurrence("once");
    setStartDate("");
  };

  function getBudgets() {}

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
      <div id="budget-collection" className="grid grid-cols-3 gap-4"></div>

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
