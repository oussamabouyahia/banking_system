import React from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
interface ListProps {
  users: User[];
}
const List: React.FC<ListProps> = ({ users }) => {
  const navigate = useNavigate();
  const openTransfertBox = (userid: number) => {
    console.log(userid);
    navigate("/transaction", { state: { id: userid } });
  };
  return (
    <div>
      <table id="list">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Balance</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.iduser}>
              <td>{user.iduser} </td>
              <td>{user.name} </td>
              <td>{user.balance} </td>
              <td>
                <button
                  className="inputbox"
                  onClick={() => openTransfertBox(user.iduser)}
                >
                  {" "}
                  Transfert money
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
