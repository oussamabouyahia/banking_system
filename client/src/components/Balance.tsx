import { useState } from "react";
import { User } from "../types";
interface BalanceProps {
  users: User[];
}
const Balance: React.FC<BalanceProps> = ({ users }) => {
  const [balance, setBalance] = useState(false);
  const [name, setName] = useState("");

  const getBalance = () => {
    setBalance(true);
  };
  return (
    <div>
      <h4>Balance </h4>
      <select onChange={(e) => setName(e.target.value)}>
        {users.map((user) => (
          <option key={user.iduser} value={user?.name}>
            {user?.name}
          </option>
        ))}
      </select>
      <button onClick={getBalance}>Get Balance</button>
      <p>
        {" "}
        the balance of {name} is :{" "}
        {balance ? users.find((user) => user.name === name)?.balance : " "}{" "}
      </p>
    </div>
  );
};

export default Balance;
