import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { getUserById } from "../helpers/api";
import { useEffect } from "react";
import { updateUser } from "../helpers/api";
import { IUser } from "../helpers/types";

export const EditUser = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IUser>();
  const { key } = useParams();

  useEffect(() => {
    getUserById(Number(key)).then((response) => {
      reset(response);
    });
  }, []);
  const handleUpdate: SubmitHandler<IUser> = (value) => {
    value.id = Number(key);
    updateUser(value).then(() => navigate("/"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit User
        </h2>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="name"
            >
              Name
            </label>
            {errors.name && (
              <p className="text-red-400"> {errors.name.message}</p>
            )}
            <input
              {...register("name", { required: "please fill name" })}
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter user's name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="surname"
            >
              Surname
            </label>
            {errors.surname && (
              <p className="text-red-400"> {errors.surname.message}</p>
            )}
            <input
              {...register("surname", { required: "please fill surname" })}
              type="text"
              id="surname"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter user's surname"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="age"
            >
              Age
            </label>
            {errors.age && (
              <p className="text-red-400"> {errors.age.message}</p>
            )}
            <input
              {...register("age", {
                required: "please fill age",
                pattern: { value: /^\d+$/, message: "age must be a number" },
              })}
              type="number"
              id="age"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter user's age"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 font-medium mb-2"
              htmlFor="salary"
            >
              Salary
            </label>
            <input
              {...register("salary")}
              type="number"
              id="salary"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter user's salary"
            />
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
              Save Changes
            </button>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
