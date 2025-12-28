import { useState } from "react";
import TransactionCard from "./TransactionCard";

function ExpenseTracker() {
  // State for expenses list
  const [expenses, setExpenses] = useState([]);

  // State for controlled form
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      category,
    };

    setExpenses([...expenses, newExpense]);

    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Expense Tracker</h2>

      {/* Controlled Form */}
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

      {/* Conditional Rendering: Empty List */}
      {expenses.length === 0 ? (
        <p>No Transactions Found</p>
      ) : (
        expenses.map((expense) => (
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
