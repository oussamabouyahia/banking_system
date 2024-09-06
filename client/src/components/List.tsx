import { User } from "../types";
import { useLoaderData, useNavigate } from "react-router-dom";

const List = () => {
  const users = useLoaderData() as User[];
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  const openTransfertBox = (userid: number, name: string) => {
    navigate("/transaction", { state: { id: userid, name: name } });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4 text-center">Beneficiaries</h1>

      {/* Table for large screens */}
      <div className="hidden md:block">
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
      </div>

      {/* Responsive view for small screens */}
      <div className="md:hidden">
        {users
          .filter((user) => user.iduser !== Number(id))
          .map((user) => (
            <div
              key={user.iduser}
              className="p-4 mb-4 bg-white rounded-lg shadow-md hover:bg-gray-100 transition duration-200"
            >
              <p className="text-lg font-semibold">Name: {user.name}</p>
              <p>ID: {user.iduser}</p>
              <p>Balance: {user.balance}</p>
              <button
                className="mt-2 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out transform"
                onClick={() => openTransfertBox(user.iduser, user.name)}
              >
                Transfer Money
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default List;
