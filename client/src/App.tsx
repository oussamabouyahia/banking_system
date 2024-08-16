import { useEffect, useState } from "react";
import "./App.css";
import { User } from "./types";
import Balance from "./components/Balance";

import axios from "axios";
import List from "./components/List";
function App() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8001/user")
      .then((res) => setUsers(res.data.users));
  }, []);
  return (
    <>
      <h1>Banking System</h1>
      <Balance users={users} />
      <List users={users} />
    </>
  );
}

export default App;
