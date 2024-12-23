import { useEffect, useState } from "react";
import { getAllUsers } from "../helpers/api";
import { IUser } from "../helpers/types";
import { Link } from "react-router-dom";
import { deleteUser } from "../helpers/api";

export const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  // const navigate = useNavigate();

  useEffect(() => {
    getAllUsers().then((response) => {
      console.log(response);
      setUsers(response);
    });
  }, []);

  const handleDelete = (id: number) => {
    deleteUser(id).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <div className="flex justify-center items-center w-16 h-16 bg-blue-500 text-white font-bold rounded-full text-xl mb-4">
              {user.name[0].toUpperCase()}
              {user.surname[0].toUpperCase()}
            </div>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-800">
                {user.name} {user.surname}
              </h2>
              <p className="text-gray-600">Age: {user.age}</p>
              <p className="text-gray-600">
                Salary: ${user.salary.toLocaleString()}
              </p>

              <Link
                to={"/user/edit/" + user.id}
                className="inline-block mt-2 px-4 py-2 text-sm text-blue-500 bg-blue-100 rounded-lg hover:bg-blue-200 hover:text-blue-700 transition"
              >
                Edit
              </Link>
              <Link
                to={"/user/details/" + user.id}
                className="inline-block mt-2 ml-2 px-4 py-2 text-sm text-green-500 bg-green-100 rounded-lg hover:bg-green-200 hover:text-green-700 transition"
              >
                Details
              </Link>

              <button
                onClick={() => handleDelete(user.id)}
                className="mt-2 ml-2 px-2 py-1 bg-red-400 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
