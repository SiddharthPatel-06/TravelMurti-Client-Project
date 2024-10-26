import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { toast } from "react-hot-toast";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [permissions, setPermissions] = useState({
    canCreatePackages: false,
    canUpdatePackages: false,
    canDeletePackages: false,
    canCreateSubPackages: false,
    canUpdateSubPackages: false,
    canDeleteSubPackages: false,
  });

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
    setPermissions(user.permissions);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(
        `/users/${editUser._id}`,
        {
          name: formData.name,
          email: formData.email,
          permissions: permissions,
        },
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
          {/* Table for Desktop */}
          <div className="hidden lg:block">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="px-4 py-3 text-sm uppercase font-semibold">
                    Name
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold">
                    Email
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold">
                    Role
                  </th>
                  <th className="px-4 py-3 text-sm uppercase font-semibold">
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
                    <td className="px-4 py-4">{user.name}</td>
                    <td className="px-4 py-4">{user.email}</td>
                    <td className="px-4 py-4">{user.role}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all duration-200"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Responsive Table */}
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

          {/* Edit User Modal */}
          {editUser && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Edit User</h2>
                <form onSubmit={handleUpdateUser}>
                  <input
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="border border-gray-300 p-2 mb-4 w-full"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="border border-gray-300 p-2 mb-4 w-full"
                  />
                  <div className="mb-4">
                    <h3 className="text-gray-700">Permissions</h3>
                    {Object.keys(permissions).map((key) => (
                      <div key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          id={key}
                          checked={permissions[key]}
                          onChange={(e) =>
                            setPermissions({
                              ...permissions,
                              [key]: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor={key} className="ml-2 text-gray-600">
                          {key}
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200"
                    >
                      Update User
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditUser(null)}
                      className="ml-2 bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-all duration-200"
                    >
                      Cancel
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
