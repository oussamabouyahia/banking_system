import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
const TransfertForm = () => {
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  console.log(location.state);
  const transaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="center">
      <h1>Transfert Money</h1>
      <form onSubmit={transaction}>
        <div className="inputbox">
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <span>Amount: </span>
        </div>

        <div className="inputbox">
          <input type="button" value="confirm transfert" />
        </div>
      </form>
    </div>
  );
};

export default TransfertForm;
