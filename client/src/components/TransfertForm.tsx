import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const TransfertForm = () => {
  const [amount, setAmount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = () => {
    const id = location.state.id;
    const senderId = 4;
    window.confirm("do you confirm the transaction");
    if (window.confirm()) {
      axios
        .post(`http://localhost:8001/user/${id}`, {
          amount: amount,
          senderId: senderId,
        })
        .then((res) => alert(res.data.message))
        .catch((err) => alert(err.message));
    } else {
      navigate("/list");
    }
  };
  return (
    <div className="center">
      <h1>Transfert Money to {location.state.name} </h1>
      <form>
        <div className="inputbox">
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <span>Amount: </span>
        </div>

        <div className="inputbox">
          <input
            type="Button"
            value="confirm transfert"
            onClick={transaction}
            onChange={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default TransfertForm;
