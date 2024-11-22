import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/reset-password`,
        { email, newPassword }
      );
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loading ? "cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
