import "./Style.css";
import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";
import { PrimaryButton } from "./Button";

function ExpenseTracker() {

//local storage integration
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const [filter, setFilter] = useState("All");

// handle form submission
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

// filter   
  const filteredExpenses = 
    filter === "All" ? 
    expenses
    : expenses.filter((expense) => expense.category === filter);

  const categories = ["All", "Food", "Transport", "Shopping"];
// delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };


  return (
    <div className="expense-tracker">
      <h3>Expense Tracker...</h3>
      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input type="number"
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

        <PrimaryButton className="submit-btn" label="Add Expense" onClick={handleSubmit} />   
      </form>
      <div className="categories">
        {categories.map((cat)=>(
         <PrimaryButton className="Category-btn"label={cat} onClick={() => setFilter(cat)} />
        ))}
      </div>

        {filteredExpenses.length === 0 ?(
          filter === "All" ? (
            <p>No expenses added yet.</p>
          ): (
            <p>No expenses in this category.</p>
          )
        ):(
          filteredExpenses.map((expense) =>(
        <TransactionCard
            key={expense.id}
            description={expense.description}
            amount={expense.amount}
            category={expense.category}
            onDelete={() => deleteExpense(expense.id)}
          />
        )))
      }
        
        
        
        
    </div>
  )
}

export default ExpenseTracker;