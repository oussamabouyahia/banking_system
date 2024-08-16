import React from "react";
import { User } from "../types";
interface ListProps {
  users: User[];
}
const List: React.FC<ListProps> = ({ users }) => {
  return (
    <div>
      <table id="list">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userid}>
              <td>{user.userid} </td>
              <td>{user.name} </td>
              <td>{user.balance} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
