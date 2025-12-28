import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";

function ExpenseTracker() {
  
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [filter, setFilter] = useState("All");

 
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      category,
    };
    setExpenses([...expenses, newExpense]);
    setDescription("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  
  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const categories = ["All", "Food", "Transport", "Shopping"];

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Expense Tracker</h2>

      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
        </select>
        <button type="submit">Add Expense</button>
      </form>

      <hr />

      
      <div style={{ marginBottom: "10px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              marginRight: "5px",
              backgroundColor: filter === cat ? "#4caf50" : "#ccc",
              color: filter === cat ? "white" : "black",
            }}
          >
            {cat}
          </button>
        ))}
      </div>


      {filteredExpenses.length === 0 ? (
        filter === "All" ? (
          <p>No Transactions Found</p>
        ) : (
          <p>No expenses for {filter}</p>
        )
      ) : (
        filteredExpenses.map((expense) => (
          <TransactionCard
            key={expense.id}
            description={expense.description}
            amount={expense.amount}
            category={expense.category}
            onDelete={() => deleteExpense(expense.id)}
          />
        ))
      )}
    </div>
  );
}

export default ExpenseTracker;
