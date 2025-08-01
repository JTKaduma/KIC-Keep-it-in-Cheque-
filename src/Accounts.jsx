import { useState } from "react";

function Accounts() {
  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState("Income");
  const [incomeType, setIncomeType] = useState("Salary");
  const [expenseType, setExpenseType] = useState("Transfer");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [dataArray, setDataArray] = useState(
    JSON.parse(localStorage.getItem("txn")) || []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      category,
      type: category === "Income" ? incomeType : expenseType,
      date,
      amount,
    };

    setDataArray((d) => {
      const updated = [...d, transaction];
      localStorage.setItem("txn", JSON.stringify(updated));
      return updated;
    });

    localStorage.setItem("txn", JSON.stringify(dataArray));

    getTxn();

    setShowModal(false);
    setCategory("Income");
    setIncomeType("Salary");
    setExpenseType("Transfer");
    setDate("");
    setAmount("");
  };

  const trnArray = JSON.parse(localStorage.getItem("txn")) || [];
  trnArray.sort((a, b) => new Date(b.date) - new Date(a.date));
  const groupedTrnArray = trnArray.reduce((acc, trn) => {
    const date = trn.date;

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(trn);
    return acc;
  }, {});

  return (
    <section className="flex flex-col w-full px-[6vw]">
      <div className="text-2xl font-bold py-[2vh]">
        <button>Accounts</button>
      </div>
      <div className="mb-[2vh]">
        <span
          className="text-blue-400 font-bold cursor-pointer"
          id="add-transaction"
          onClick={() => setShowModal(true)}
        >
          Add Transaction
        </span>
      </div>
      <div id="accountInfo" className="flex flex-col gap-[2vh] bg-gray-400 rounded-md p-[2vh]">
        {Object.entries(groupedTrnArray).map(([date, transactions]) => {
          let total = 0;
          transactions.forEach(trn => {
            if (trn.category === "Income") {
              total += Number(trn.amount);
            } else {
              total -= Number(trn.amount);
            }
          });
          const options = { year: "numeric", month: "short", day: "2-digit" };
          const dateHead = new Date(date).toLocaleDateString("en-US", options);

          return (
            <div key={date} className="mb-4">
              <p className="flex flex-row justify-between items-center text-xl font-bold text-white mb-2">
                <span className="text-white/80">{dateHead}</span>
                <span className={total >= 0 ? "text-green-300" : "text-red-300"}>
                  {total >= 0 ? "+" : ""}
                  {Number(total).toFixed(2).toLocaleString()} NGN
                </span>
              </p>
              {transactions.map((trn, idx) => (
                <p
                  key={idx}
                  className="flex flex-row justify-between items-center text-lg text-white/90 pl-4"
                >
                  <span>{trn.type}</span>
                  <span className={trn.category === "Income" ? "text-green-200" : "text-red-200"}>
                    {trn.category === "Income" ? "+" : "-"}
                    {Number(trn.amount).toFixed(2).toLocaleString()} NGN
                  </span>
                </p>
              ))}
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[320px] max-w-[50vw] w-full">
            <h2 className="text-xl font-bold mb-4 text-blue-500">
              Add Transaction
            </h2>
            <form id="transactionForm" onSubmit={handleSubmit}>
              <label className="block mb-1 font-medium text-gray-700">
                Category
              </label>
              <select
                name="Category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="Income">Income</option>
                <option value="Expenses">Expenses</option>
              </select>

              {category === "Income" ? (
                <>
                  <label className="block mb-1 font-medium text-gray-700">
                    Income Type
                  </label>
                  <select
                    name="incomeType"
                    id="incomeCategory"
                    value={incomeType}
                    onChange={(e) => setIncomeType(e.target.value)}
                    className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Salary">Salary</option>
                    <option value="Allowance">Allowance</option>
                    <option value="Gifts">Gifts</option>
                    <option value="Others">Others</option>
                  </select>
                </>
              ) : (
                <>
                  <label className="block mb-1 font-medium text-gray-700">
                    Expense Type
                  </label>
                  <select
                    name="expenseType"
                    id="expenseCategory"
                    value={expenseType}
                    onChange={(e) => setExpenseType(e.target.value)}
                    className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="Transfer">Transfer</option>
                    <option value="Bills">Bills</option>
                    <option value="Food">Food & Drink</option>
                    <option value="Transport">Transport</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Miscelleanious">Miscelleanious</option>
                    <option value="Others">Others</option>
                  </select>
                </>
              )}

              <label className="block mb-1 font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <label className="block mb-1 font-medium text-gray-700">
                Amount
              </label>
              <input
                type="number"
                min="0"
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 w-full mb-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <input
                  type="submit"
                  value="Add Transaction"
                  className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Accounts;
