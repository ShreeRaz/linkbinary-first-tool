function TransactionCard({ description, amount, category, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "8px" }}>
      <h4>{description}</h4>
      <p>Amount: NPR {amount}</p>
      <p>Category: {category}</p>

      
      {amount > 1000 && (
        <span style={{ color: "red", fontWeight: "bold" }}>
          ⚠ High Spend
        </span>
      )}

      <br />
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default TransactionCard;
