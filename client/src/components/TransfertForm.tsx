import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmDialog from "./ConfirmDialog";
const TransfertForm = () => {
  const [amount, setAmount] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const transaction = () => {
    const id = location.state.id;
    const senderId = 4;

    axios
      .post(`http://localhost:8001/user/transfert/${id}`, {
        amount: amount,
        senderId: senderId,
      })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.message));
  };
  const handleTransaction = () => {
    transaction();
    setAmount(0);
    setShowDialog(false);
  };
  const cancelTransaction = () => {
    setAmount(0);
    setShowDialog(false);
    navigate("/list");
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
            onClick={() => setShowDialog(true)}
            onChange={() => {}}
          />
        </div>
        {showDialog && (
          <ConfirmDialog
            title="transaction"
            message="do you confirm this transaction"
            onCancel={cancelTransaction}
            onConfirm={handleTransaction}
          />
        )}
      </form>
    </div>
  );
};

export default TransfertForm;
