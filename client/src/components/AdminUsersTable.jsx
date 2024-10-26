import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/users/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully", { position: "top-right" });
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/users/${editUser._id}`,
        { name: formData.name, email: formData.email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === editUser._id ? res.data : user))
      );
      setEditUser(null);
      toast.success("User updated successfully", { position: "top-right" });
    } catch (error) {
      toast.error("Error updating user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Manage Users</h2>
        <div className="relative mt-6 bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Responsive Table for Desktop */}
          <div className="hidden lg:block">
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                  <th className="px-4 py-3 text-sm uppercase font-semibold tracking-wide">
                    Name
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold tracking-wide">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold tracking-wide">
                    Role
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold tracking-wide">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="bg-white border-b hover:bg-gray-100 transition-all duration-150"
                  >
                    <td className="px-4 py-4 text-gray-700">{user.name}</td>
                    <td className="px-4 py-4 text-gray-600">{user.email}</td>
                    <td className="px-4 py-4 text-gray-600">{user.role}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-200 shadow-lg"
                          onClick={() => handleDelete(user._id)}
                        >
                          <span className="mr-1">Delete</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <button
                          className="flex items-center bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 shadow-lg"
                          onClick={() => handleEditClick(user)}
                        >
                          <span className="mr-1">Edit</span>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15.232 5.232a2.828 2.828 0 010 4l-.707.707L7.5 16.5l-2 2V18h-.707L3 20.707l2-.707V17.5l6.293-6.293.707-.707a2.828 2.828 0 014 0l.707-.707z"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Mobile Screens */}
          <div className="grid grid-cols-1 gap-4 mt-6 lg:hidden">
            {users.length === 0 ? (
              <div className="text-center py-4 text-gray-600 col-span-full">
                No users available
              </div>
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  {/* User Info Table */}
                  <table className="min-w-full border-collapse">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Name:
                        </td>
                        <td className="border px-4 py-2">{user.name}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Email:
                        </td>
                        <td className="border px-4 py-2">{user.email}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">
                          Role:
                        </td>
                        <td className="border px-4 py-2">{user.role}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Action Buttons */}
                  <div className="flex justify-center items-center mt-4">
                    <div className="flex space-x-2">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-150"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-150"
                        onClick={() => handleEditClick(user)}
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Edit Modal */}
          {editUser && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md shadow-lg w-3/5 md:w-1/3">
                {" "}
                {/* Increase width for mobile */}
                <h2 className="text-2xl font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleUpdateUser}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2"
                      onClick={() => setEditUser(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
// Perfectly working fully responsive 