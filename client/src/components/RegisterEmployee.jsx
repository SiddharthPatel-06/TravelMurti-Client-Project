import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [permissions, setPermissions] = useState({
    canCreatePackages: false,
    canUpdatePackages: false,
    canDeletePackages: false,
    canCreateSubPackages: false,
    canUpdateSubPackages: false,
    canDeleteSubPackages: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/register", {
        name,
        email,
        password,
        role,
        permissions,
      });

      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
      });
      setIsLoading(false);
      navigate("/admin/login");
    } catch (error) {
      if (error.response?.status === 500) {
        toast.error("Server issue, please try again later.", {
          position: "top-right",
        });
      } else {
        toast.error("Registration failed, please check your details.", {
          position: "top-right",
        });
      }
      setIsLoading(false);
    }
  };

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setPermissions((prevPermissions) => ({
      ...prevPermissions,
      [name]: checked,
    }));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-0 py-10">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg sm:max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Create Employee Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Input */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role Selector */}
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-1">
              Role
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Permissions */}
          <div className="mt-5">
            <h3 className="text-gray-600 text-sm font-medium mb-2">
              Assign Permissions
            </h3>
            <div className="space-y-2">
              {[
                { label: "Can Create Packages", name: "canCreatePackages" },
                { label: "Can Update Packages", name: "canUpdatePackages" },
                { label: "Can Delete Packages", name: "canDeletePackages" },
                {
                  label: "Can Create Sub-Packages",
                  name: "canCreateSubPackages",
                },
                {
                  label: "Can Update Sub-Packages",
                  name: "canUpdateSubPackages",
                },
                {
                  label: "Can Delete Sub-Packages",
                  name: "canDeleteSubPackages",
                },
              ].map((permission) => (
                <label key={permission.name} className="block">
                  <input
                    type="checkbox"
                    name={permission.name}
                    checked={permissions[permission.name]}
                    onChange={handlePermissionChange}
                  />
                  <span className="ml-2">{permission.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
