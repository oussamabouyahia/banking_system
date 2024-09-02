import React from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";

interface ListProps {
  users: User[];
}

const List: React.FC<ListProps> = ({ users }) => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");
  const openTransfertBox = (userid: number, name: string) => {
    navigate("/transaction", { state: { id: userid, name: name } });
  };

  return (
    <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="text-left p-4">ID</th>
          <th className="text-left p-4">Name</th>
          <th className="text-left p-4">Balance</th>
          <th className="p-4"></th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((user) => user.iduser !== Number(id))
          .map((user) => (
            <tr
              key={user.iduser}
              className="hover:bg-gray-100 transition-colors duration-200"
            >
              <td className="p-4 border-b">{user.iduser}</td>
              <td className="p-4 border-b">{user.name}</td>
              <td className="p-4 border-b">{user.balance}</td>
              <td className="p-4 border-b">
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
                  onClick={() => openTransfertBox(user.iduser, user.name)}
                >
                  Transfer Money
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default List;
