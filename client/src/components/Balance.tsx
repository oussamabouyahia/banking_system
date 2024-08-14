import { useState } from "react";
import { User } from "../types";
import data from "../dummyData";
const Balance = () => {
  const [users] = useState<User[]>(data);
  const [balance, setBalance] = useState(false);
  const [name, setName] = useState(users[0].name);
  const getBalance = () => {
    setBalance(true);
  };
  return (
    <div>
      <h4>Balance </h4>
      <select onChange={(e) => setName(e.target.value)}>
        {users.map((user) => (
          <option value={user.name}>{user.name} </option>
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
