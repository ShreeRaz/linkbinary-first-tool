import "./Style.css";
import {PrimaryButton} from "./Button";

function TransactionCard({description,amount,category,onDelete}) {
  return (
    <div className="transaction-card">
      <h4>{description}</h4>
      <p>Amount: NPR {amount}</p>
      <p>Category: {category}</p>

      {amount >1000 && 
      <p className="high-spend">
        ⚠️ High Spend Alert!
      </p>}
      <PrimaryButton className="delete-btn" label="Delete" onClick={onDelete}/>
    </div>
  );
}

export default TransactionCard;
